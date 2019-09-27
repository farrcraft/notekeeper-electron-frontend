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
}

export default WindowState;
