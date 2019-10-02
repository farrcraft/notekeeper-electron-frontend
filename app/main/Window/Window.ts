import {
  BrowserWindow, screen
} from 'electron';
import path from 'path';

import MenuBuilder from '../Menu';
import { WindowState } from '../../domain/UI';
import { Window as WindowInterface } from '../../interfaces/main';
import { Api as ApiInterface } from '../../interfaces/api';
import { Ui as UiEndpoint } from '../../api/endpoints';

/**
 * The renderer process window
 */
export default class Window implements WindowInterface {
  /**
   * Browser window where the renderer process lives
   */
  window: BrowserWindow|undefined;

  /**
   * Timeout used for saving window state
   */
  windowStateTimeout: NodeJS.Timeout|null;

  /**
   * Backing store for maintaining window state
   */
  state: WindowState;

  api: ApiInterface;

  /**
   * Constructor
   *
   * @param api
   */
  constructor(api: ApiInterface) {
    this.api = api;
    this.windowStateTimeout = null;
    this.state = new WindowState();
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

    const options: Electron.BrowserWindowConstructorOptions = {
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
      this.window = undefined;
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
  saveWindowState(): void {
    if (!this.window) {
      return;
    }
    this.windowStateTimeout = null;

    // where and how big the window is
    const bounds = this.window.getBounds();
    this.state.setWindowBounds(bounds.width, bounds.height, bounds.x, bounds.y);

    // how big the display is
    const displayBounds = screen.getDisplayMatching(bounds).bounds;
    this.state.setDisplayBounds(displayBounds.width, displayBounds.height, displayBounds.x, displayBounds.y);

    this.state.maximized = this.window.isMaximized();
    this.state.minimized = this.window.isMinimized();
    this.state.fullscreen = this.window.isFullScreen();

    const endpoint = <UiEndpoint>this.api.getEndpoint('ui');
    endpoint.saveWindowState(this.state);
  }

  updateWindowFromState(): void {
    if (this.window === undefined) {
      return;
    }

    const restoreBounds: Electron.Rectangle = {
      width: this.state.windowBounds.width,
      height: this.state.windowBounds.height,
      x: this.state.windowBounds.x,
      y: this.state.windowBounds.y
    };
    const displayBounds = screen.getDisplayMatching(restoreBounds).bounds;

    if (
      displayBounds.x === this.state.displayBounds.x
      && displayBounds.y === this.state.displayBounds.y
      && displayBounds.width === this.state.displayBounds.width
      && displayBounds.height === this.state.displayBounds.height
    ) {
      this.window.setBounds(restoreBounds);
    }

    if (this.state.maximized) {
      this.window.maximize();
    }
    if (this.state.minimized) {
      this.window.minimize();
    }
    if (this.state.fullscreen) {
      this.window.setFullScreen(true);
    }
  }

  // restoreWindowState sets the current window position/size to the last saved values
  restoreWindowState(): void {
    const endpoint = <UiEndpoint>this.api.getEndpoint('ui');
    // [FIXME] - this is an async api call - need to trigger updateWindowFromState() after completion
    this.state = endpoint.loadWindowState();
  }
}
