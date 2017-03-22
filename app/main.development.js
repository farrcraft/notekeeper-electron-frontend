import { electron, app, BrowserWindow, Menu, shell } from 'electron';
import Core from './shared';
import MenuBuilder from './menu';
import { default as rpc } from './transports/Rpc';
import uiStateStore from './stores/UIState';
import { default as UIStateTransport } from './transports/UIState';

let menu;
let template;
// Declared here so our main window doesn't get GC'd
let mainWindow = null;

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
  } catch (e) {
    console.log(e);
  }
  // [FIXME] - should lock account in backend process here?
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

function createWindow(width, height) {
  mainWindow = new BrowserWindow({
    /*
    webPreferences: {
      nodeIntegration: false
    },
    */
    show: false,
    width: width,
    height: height
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method
    // which returns an object with the height, width, and x and y coordinates.
    const bounds = mainWindow.getBounds();
    uiStateStore.windowWidth = bounds.width;
    uiStateStore.windowHeight = bounds.height;
  });

  mainWindow.on('closed', () => {
    // Terminate backend process
    // backend.kill('SIGINT');
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
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

  console.log('creating window');
  createWindow(width, height);

  console.log('registering rpc transports');
  rpc.registerTransports();
  console.log('registered transports');
});
