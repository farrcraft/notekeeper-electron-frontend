import {
  BrowserWindow, screen
} from 'electron';
import MenuBuilder from './menu';
import path from 'path';

/**
 * The renderer process window
 */
export default class Window {
  /**
   * Browser window where the renderer process lives
   */
  window: BrowserWindow = null;

  /**
   * Timeout used for saving window state
   */
  windowStateTimeout: NodeJS.Timeout = null;

  /**
   * Backing store for maintaining window state
   */
  uiStateStore = null;

  /**
   * Constructor
   *
   * @param store
   */
  constructor(store) {
    this.uiStateStore = store;
  }

  /**
   * Create the renderer process' browser window
   *
   * @param width
   * @param height
   * @param x
   * @param y
   */
  create(width: number, height: number, x: number, y: number): void {
    let preloadScript = 'preload.prod.js';
    if (process.env.NODE_ENV === 'development') {
      preloadScript = 'preload.dev.js';
    }

    const options = {
      webPreferences: {
        nodeIntegration: false, // this is false by default as of electron 5.0
        preload: path.join(__dirname, preloadScript)
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
    this.window = new BrowserWindow(options);

    this.window.loadURL(`file://${__dirname}/../../app.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    this.window.webContents.on('did-finish-load', () => {
      if (!this.window) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.window.minimize();
      } else {
        this.window.show();
        this.window.focus();
      }
    });

    const delayedSave = (): void => { this.delayedWindowStateSave(); };
    this.window.on('resize', delayedSave);
    this.window.on('move', delayedSave);

    this.window.on('closed', () => {
      // Terminate backend process
      // backend.kill('SIGINT');
      this.window = null;
    });

    const menuBuilder = new MenuBuilder(this.window);
    menuBuilder.buildMenu();

    this.restoreWindowState();
  }

  /**
   * Schedule the window state to be saved in the future
   */
  delayedWindowStateSave(): void {
    if (this.windowStateTimeout) {
      clearTimeout(this.windowStateTimeout);
    }
    const updateState = (): void => { this.updateWindowState(); };
    this.windowStateTimeout = setTimeout(updateState, 5000);
  }

  /**
   * Saves the current window state (position/size) to the db
   */
  updateWindowState(): void {
    if (!this.window) {
      return;
    }
    this.windowStateTimeout = null;

    // where and how big the window is
    const bounds = this.window.getBounds();
    this.uiStateStore.windowWidth = bounds.width;
    this.uiStateStore.windowHeight = bounds.height;
    this.uiStateStore.windowXPosition = bounds.x;
    this.uiStateStore.windowYPosition = bounds.y;

    // how big the display is
    const displayBounds = screen.getDisplayMatching(bounds);
    this.uiStateStore.displayWidth = displayBounds.width;
    this.uiStateStore.displayHeight = displayBounds.height;
    this.uiStateStore.displayXPosition = displayBounds.x;
    this.uiStateStore.displayYPosition = displayBounds.y;

    this.uiStateStore.windowMaximized = this.window.isMaximized();
    this.uiStateStore.windowMinimized = this.window.isMinimized();
    this.uiStateStore.windowFullscreen = this.window.isFullScreen();

    this.uiStateStore.save();
  }

  // restoreWindowState sets the current window position/size to the last saved values
  restoreWindowState(): void {
    const restoreBounds = {};
    restoreBounds.width = this.uiStateStore.windowWidth;
    restoreBounds.height = this.uiStateStore.windowHeight;
    restoreBounds.x = this.uiStateStore.windowXPosition;
    restoreBounds.y = this.uiStateStore.windowYPosition;

    const displayBounds = screen.getDisplayMatching(restoreBounds);

    if (
      displayBounds.x === this.uiStateStore.displayXPosition
      && displayBounds.y === this.uiStateStore.displayYPosition
      && displayBounds.width === this.uiStateStore.displayWidth
      && displayBounds.height === this.uiStateStore.displayHeight
    ) {
      this.window.setBounds(restoreBounds);
    }

    if (this.uiStateStore.windowMaximized) {
      this.window.maximize();
    }
    if (this.uiStateStore.windowMinimized) {
      this.window.minimize();
    }
    if (this.uiStateStore.windowFullscreen) {
      this.window.setFullScreen(true);
    }
  }
}
