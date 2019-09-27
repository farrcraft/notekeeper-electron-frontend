import { BrowserWindow } from 'electron';

import { Api as ApiInterface } from '../../../interfaces/api';
import { WindowState as WindowStateInterface } from '../../../interfaces/domain/UI';

/**
 *
 */
interface Window {

  /**
   *
   */
  window: BrowserWindow|undefined;

  /**
   *
   */
  windowStateTimeout: NodeJS.Timeout|null;

  /**
   *
   */
  api: ApiInterface;

  /**
   *
   */
  state: WindowStateInterface;

  /**
   *
   * @param width
   * @param height
   * @param x
   * @param y
   */
  create(width: number, height: number, x: number, y: number): void;
}

export default Window;
