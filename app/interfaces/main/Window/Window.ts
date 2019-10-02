import { BrowserWindow } from 'electron';

import { Api as ApiInterface } from '../../api';
import { WindowState as WindowStateInterface } from '../../domain/Ui';

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
