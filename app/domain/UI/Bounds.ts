import { Bounds as BoundsInterface } from '../../interfaces/domain/UI';

/**
 *
 */
class Bounds implements BoundsInterface {
  /**
   *
   */
  width: number;

  /**
   *
   */
  height: number;

  /**
   *
   */
  x: number;

  /**
   *
   */
  y: number;

  /**
   *
   * @param width
   * @param height
   * @param x
   * @param y
   */
  constructor(width: number, height: number, x: number, y: number) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}

export default Bounds;
