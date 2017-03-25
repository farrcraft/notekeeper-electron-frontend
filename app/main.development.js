import { electron, app, BrowserWindow, Menu, shell, screen, Rectangle } from 'electron';
import Core from './shared';
import MenuBuilder from './menu';
import { default as rpc } from './transports/rpc/Rpc';
import uiStateStore from './stores/UIState';
import { default as UIStateTransport } from './transports/rpc/UIState';

// Declared here so our main window doesn't get GC'd
let mainWindow = null;
let windowStateTimeout = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

process.on('error', (err) => {
  console.log(err);
});

// We only want a single instance to be able to run at once
const shouldQuit = app.makeSingleInstance((argv, workingDirectory) => {
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
    createWindow();
  }
});

app.on('will-quit', () => {
  // all windows have been closed & app is about to quit
});

app.on('window-all-closed', async () => {
  try {
    await uiStateStore.save();

    const accountTransport = rpc.getTransport('account');
    if (accountTransport.store.locked === false) {
      await accountTransport.lock();
    }
  } catch (e) {
    console.log(e);
  }
  Core.shutdown();
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
  const restoreBounds = new Rectangle();
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
    width: width,
    height: height
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

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  restoreWindowState();
}

app.on('ready', async () => {
  await installExtensions();

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

  rpc.registerTransports();

  createWindow(width, height, uiStateStore.windowXPosition, uiStateStore.windowYPosition);
});
