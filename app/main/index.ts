/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 */
import {
  app, session, shell
} from 'electron';
import { URL } from 'url';

import AppUpdater from './updater';
import Backend from './backend';
import Logger from '../shared/Logger';
import Rpc from './rpc/Rpc';
import { KexRPC, DbRPC } from './rpc';
import bindTransports from './bindings';
import Window from './window';

// These are special cases where we need to mirror state from the UI here in the main process
import AccountStore from '../renderer/stores/Account';
import UIStateStore from '../renderer/stores/UIState';

// Declared here so our main window doesn't get GC'd
let mainWindow: Window = null;
let backendServer: Backend = null;

const userDataPath: string = app.getPath('userData');
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
const gotTheLock: boolean = app.requestSingleInstanceLock();
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

mainWindow = new Window(uiStateStore);
backendServer = new Backend();

app.on('second-instance', (/* event, commandLine, workingDirectory */): void => {
  if (mainWindow) {
    if (mainWindow.window.isMinimized()) {
      mainWindow.window.restore();
    }
    mainWindow.window.focus();
  }
});

app.on('activate', (): void => {
  if (mainWindow === null) {
    // [FIXME] - expects some parameters here
    mainWindow.create();
  }
});

app.on('will-quit', (): void => {
  // all windows have been closed & app is about to quit
  backendServer.destroy();
});

app.on('window-all-closed', async (): void => {
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
app.on('web-contents-created', (event, contents): void => {
  contents.on('will-navigate', (navEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.origin !== 'https://notekeeper.io') {
      navEvent.preventDefault();
    }
  });
});

// Security - Prevent opening new windows
app.on('web-contents-created', (event, contents): void => {
  contents.on('new-window', (windowEvent, navigationUrl) => {
    // Allow new devtools to be updated when in dev
    if (
      process.env.NODE_ENV === 'development'
      && navigationUrl.startsWith('chrome-devtools://')
    ) {
      return;
    }

    windowEvent.preventDefault();
    // Open event's url in the default browser
    shell.openExternal(navigationUrl);
  });
});

// Security - Verify webview options
app.on('web-contents-created', (event, contents): void => {
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
function setContentSecurityPolicy(): void {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self'"]
      }
    });
  });
}

const installExtensions = async (): void => {
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

app.on('ready', async (): void => {
  await backendServer.create(rpcMain);

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
  let width: number = uiStateStore.windowWidth;
  let height: number = uiStateStore.windowHeight;
  if (width <= 0) {
    width = 800;
  }
  if (height <= 0) {
    height = 600;
  }

  mainWindow.create(
    width,
    height,
    uiStateStore.windowXPosition,
    uiStateStore.windowYPosition
  );
  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});
