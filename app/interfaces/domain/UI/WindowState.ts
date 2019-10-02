import Bounds from './Bounds';

/**
 *
 */
interface WindowState {
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
   * @param width
   * @param height
   * @param x
   * @param y
   */
  setWindowBounds(width: number, height: number, x: number, y: number): void;

  /**
   *
   * @param width
   * @param height
   * @param x
   * @param y
   */
  setDisplayBounds(width: number, height: number, x: number, y: number): void;
}

export default WindowState;
