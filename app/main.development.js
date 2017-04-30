/* eslint global-require: 1, flowtype-errors/show-errors: 0 */
// @flow
import { app, BrowserWindow, screen, Rectangle } from 'electron';
import childProcess from 'child_process';
import Core from './shared';
import MenuBuilder from './menu';
import rpc from './transports/rpc/Rpc';
import uiStateStore from './stores/UIState';
import UIStateTransport from './transports/rpc/UIState';

// Declared here so our main window doesn't get GC'd
let mainWindow = null;
let windowStateTimeout = null;
let menuBuilder = null;
let backendServer = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

process.on('error', (err) => {
  console.log(err);
});

// We only want a single instance to be able to run at once
const shouldQuit = app.makeSingleInstance((/* argv, workingDirectory */) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});

if (shouldQuit) {
  app.quit();
}

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

    const accountTransport = rpc.getTransport('account');
    // The most secure option is to completely sign out the user when they close the main window
    // The user will need to do a full signin the next time they open the app
    if (accountTransport.store.signedIn === true) {
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
    console.log(e);
  }
  Core.shutdown();
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    // TODO: Use async interation statement.
    //       Waiting on https://github.com/tc39/proposal-async-iteration
    //       Promises will fail silently, which isn't what we want in development
    return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log);
  }
};

const createBackendServer = async () => {
  const promise = new Promise((resolve, reject) => {
    backendServer = childProcess.spawn('./app/resources/backend');
    backendServer.stdout.on('data', (data) => {
      const out = data.toString();
      if (out === 'NOTEKEEPER_SERVICE_READY\n') {
        Core.waitForReady(10, () => {
          resolve(out);
        });
      } else {
        // [FIXME] - need to capture this in a frontend log file
        console.log(out);
        reject(out);
      }
    });
    backendServer.stderr.on('data', (data) => {
      // [FIXME] - need to capture this in a frontend log file
      console.log(data.toString());
    });
    backendServer.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        // [FIXME] - need to capture this in a frontend log file
        console.log(`Child exited with code ${code}`);
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

  if (displayBounds.x === uiStateStore.displayXPosition &&
    displayBounds.y === uiStateStore.displayYPosition &&
    displayBounds.width === uiStateStore.displayWidth &&
    displayBounds.height === uiStateStore.displayHeight) {
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
    /*
    webPreferences: {
      nodeIntegration: false
    },
    */
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

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('resize', delayedWindowStateSave);
  mainWindow.on('move', delayedWindowStateSave);

  mainWindow.on('closed', () => {
    // Terminate backend process
    // backend.kill('SIGINT');
    mainWindow = null;
  });

  menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  restoreWindowState();
}

app.on('ready', async () => {
  await createBackendServer();

  await installExtensions();

  await Core.keyExchange();
  await Core.openMasterDb();

  const uiTransport = new UIStateTransport();
  uiStateStore.setTransport(uiTransport);
  await uiStateStore.load();
  let width = uiStateStore.windowWidth;
  let height = uiStateStore.windowHeight;
  if (width <= 0) {
    width = 800;
  }
  if (height <= 0) {
    height = 600;
  }

  createWindow(width, height, uiStateStore.windowXPosition, uiStateStore.windowYPosition);
});
