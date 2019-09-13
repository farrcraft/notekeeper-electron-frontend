/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
import { app, BrowserWindow, screen, session, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import childProcess from 'child_process';
import path from 'path';
import { URL } from 'url';
import Logger from './shared/Logger';
import MenuBuilder from './menu';
import Rpc from './transports/rpc/Rpc';
import bindTransports from './transport_bindings/rpc';
import AccountStore from './stores/Account';
import UIStateStore from './stores/UIState';
import { KexRPC, DbRPC } from './transports/rpc';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// Declared here so our main window doesn't get GC'd
let mainWindow = null;
let windowStateTimeout = null;
let backendServer = null;

const userDataPath = app.getPath('userData');
Logger.configure(userDataPath);

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

process.on('error', err => {
  Logger.debug(err);
});

// We only want a single instance to be able to run at once
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

// Setup main RPC mechanism for communicating with the backend service
const rpcMain = new Rpc();
bindTransports(rpcMain);
// we mirror the store in the main process in order to track some account state
const accountTransport = rpcMain.getTransport('account');
const accountStore = new AccountStore(null);
accountTransport.setStore(accountStore);
// we also need the main
const uiStateStore = new UIStateStore(null);
const uiStateTransport = rpcMain.getTransport('uiState');
uiStateStore.setTransport(uiStateTransport);

app.on('second-instance', (/* event, commandLine, workingDirectory */) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    // [FIXME] - expects some parameters here
    createWindow();
  }
});

app.on('will-quit', () => {
  // all windows have been closed & app is about to quit
  destroyBackendServer();
});

app.on('window-all-closed', async () => {
  try {
    await uiStateStore.save();

    // The most secure option is to completely sign out the user when they close the main window
    // The user will need to do a full signin the next time they open the app
    if (accountStore.signedIn === true) {
      await accountTransport.signout();
    }
    // If the user has opted into the less secure "remember me" option
    // then we can just lock instead:
    /*
    if (accountTransport.store.locked === false) {
      await accountTransport.lock();
    }
    */
  } catch (e) {
    Logger.debug(e);
  }

  // Used to be in shared/Core.js - there is currently not RPC shutdown logic
  // Core.shutdown();

  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security-related configuration
// See: https://electronjs.org/docs/tutorial/security

// Security - Disable navigation
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (navEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.origin !== 'https://notekeeper.io') {
      navEvent.preventDefault();
    }
  });
});

// Security - Prevent opening new windows
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (windowEvent, navigationUrl) => {
    // Allow new devtools to be updated when in dev
    if (
      process.env.NODE_ENV === 'development' &&
      navigationUrl.startsWith('chrome-devtools://')
    ) {
      return;
    }

    windowEvent.preventDefault();
    // Open event's url in the default browser
    shell.openExternal(navigationUrl);
  });
});

// Security - Verify webview options
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (viewEvent, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    const webPrefs = webPreferences;
    delete webPrefs.preload;
    delete webPrefs.preloadURL;

    // Disable Node.js integration
    webPrefs.nodeIntegration = false;

    // Verify URL being loaded
    if (!params.src.startsWith('https://notekeeper.io/')) {
      viewEvent.preventDefault();
    }
  });
});

// Security - Set CSP HTTP Header
function setContentSecurityPolicy() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self'"]
      }
    });
  });
}

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      MOBX_DEVTOOLS
    } = require('electron-devtools-installer');

    return installExtension([REACT_DEVELOPER_TOOLS.id, MOBX_DEVTOOLS.id])
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  }
};

const createBackendServer = async () => {
  const promise = new Promise((resolve, reject) => {
    backendServer = childProcess.spawn('./app/resources/backend');
    backendServer.stdout.on('data', data => {
      const out = data.toString();
      if (out === 'NOTEKEEPER_SERVICE_READY\n') {
        rpcMain.waitForReady(10, () => {
          resolve(out);
        });
      } else {
        Logger.debug(out);
        reject(out);
      }
    });
    backendServer.stderr.on('data', data => {
      Logger.debug(data.toString());
    });
    backendServer.on('exit', code => {
      if (code !== 0 && code !== null) {
        Logger.debug(`Child exited with code ${code}`);
      }
    });
  });
  return promise;
};

function destroyBackendServer() {
  backendServer.kill();
}

// delayedWindowStateSave schedules the window state to be saved in the future
function delayedWindowStateSave() {
  if (windowStateTimeout) {
    clearTimeout(windowStateTimeout);
  }
  windowStateTimeout = setTimeout(updateWindowState, 5000);
}

// updateWindowState saves the current window state (position/size) to the db
function updateWindowState() {
  if (!mainWindow) {
    return;
  }
  windowStateTimeout = null;

  // where and how big the window is
  const bounds = mainWindow.getBounds();
  uiStateStore.windowWidth = bounds.width;
  uiStateStore.windowHeight = bounds.height;
  uiStateStore.windowXPosition = bounds.x;
  uiStateStore.windowYPosition = bounds.y;

  // how big the display is
  const displayBounds = screen.getDisplayMatching(bounds);
  uiStateStore.displayWidth = displayBounds.width;
  uiStateStore.displayHeight = displayBounds.height;
  uiStateStore.displayXPosition = displayBounds.x;
  uiStateStore.displayYPosition = displayBounds.y;

  uiStateStore.windowMaximized = mainWindow.isMaximized();
  uiStateStore.windowMinimized = mainWindow.isMinimized();
  uiStateStore.windowFullscreen = mainWindow.isFullScreen();

  uiStateStore.save();
}

// restoreWindowState sets the current window position/size to the last saved values
function restoreWindowState() {
  const restoreBounds = {};
  restoreBounds.width = uiStateStore.windowWidth;
  restoreBounds.height = uiStateStore.windowHeight;
  restoreBounds.x = uiStateStore.windowXPosition;
  restoreBounds.y = uiStateStore.windowYPosition;

  const displayBounds = screen.getDisplayMatching(restoreBounds);

  if (
    displayBounds.x === uiStateStore.displayXPosition &&
    displayBounds.y === uiStateStore.displayYPosition &&
    displayBounds.width === uiStateStore.displayWidth &&
    displayBounds.height === uiStateStore.displayHeight
  ) {
    mainWindow.setBounds(restoreBounds);
  }

  if (uiStateStore.windowMaximized) {
    mainWindow.maximize();
  }
  if (uiStateStore.windowMinimized) {
    mainWindow.minimize();
  }
  if (uiStateStore.windowFullscreen) {
    mainWindow.setFullScreen(true);
  }
}

function createWindow(width, height, x, y) {
  const options = {
    webPreferences: {
      nodeIntegration: false, // this is false by default as of electron 5.0
      preload: path.join(__dirname, 'preload.dev.js') // [FIXME] - need to fix for production builds
    },
    show: false,
    width,
    height
  };
  if (x >= 0) {
    options.x = x;
  }
  if (y >= 0) {
    options.y = y;
  }
  mainWindow = new BrowserWindow(options);

  mainWindow.loadURL(`file://${__dirname}/../app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('resize', delayedWindowStateSave);
  mainWindow.on('move', delayedWindowStateSave);

  mainWindow.on('closed', () => {
    // Terminate backend process
    // backend.kill('SIGINT');
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  restoreWindowState();
}

app.on('ready', async () => {
  await createBackendServer();

  await installExtensions();

  setContentSecurityPolicy();

  const kexMain = new KexRPC(rpcMain);
  const dbMain = new DbRPC(rpcMain);
  // register our kex & db transports should we need them later on
  rpcMain.registerTransport('kex', kexMain);
  rpcMain.registerTransport('db', dbMain);

  await kexMain.keyExchange();
  await dbMain.openMasterDb();

  await uiStateStore.load();
  let width = uiStateStore.windowWidth;
  let height = uiStateStore.windowHeight;
  if (width <= 0) {
    width = 800;
  }
  if (height <= 0) {
    height = 600;
  }

  createWindow(
    width,
    height,
    uiStateStore.windowXPosition,
    uiStateStore.windowYPosition
  );
  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});
