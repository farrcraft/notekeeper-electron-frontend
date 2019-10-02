import Bounds from './Bounds';
import { WindowState as WindowStateInterface } from '../../interfaces/domain/Ui';

/**
 *
 */
class WindowState implements WindowStateInterface {
  /**
   *
   */
  fullscreen: boolean;

  /**
   *
   */
  maximized: boolean;

  /**
   *
   */
  minimized: boolean;

  /**
   *
   */
  windowBounds: Bounds;

  /**
   *
   */
  displayBounds: Bounds;

  /**
   *
   */
  constructor() {
    this.fullscreen = false;
    this.maximized = false;
    this.minimized = false;
    this.displayBounds = new Bounds(0, 0, 0, 0);
    this.windowBounds = new Bounds(0, 0, 0, 0);
  }

  /**
   *
   * @param width
   * @param height
   * @param x
   * @param y
   */
  setWindowBounds(width: number, height: number, x: number, y: number): void {
    this.windowBounds = {
      width,
      height,
      x,
      y
    };
  }

  /**
   *
   * @param width
   * @param height
   * @param x
   * @param y
   */
  setDisplayBounds(width: number, height: number, x: number, y: number): void {
    this.displayBounds = {
      width,
      height,
      x,
      y
    };
  }
}

export default WindowState;
