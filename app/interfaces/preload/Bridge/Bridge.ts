import { IpcRenderer } from 'electron';

import Env from './Env';
import ErrorMessage from './ErrorMessage';
import UserData from './UserData';

/**
 * The bridge between the main and renderer process established via preload
 */
interface Bridge {
  /**
   * Node process properties
   */
  env: Env;

  /**
   * The electron IPC mechanism for the renderer process
   */
  ipc: IpcRenderer;

  /**
   * Electron user data properties
   */
  userData: UserData;

  /**
   * The last error that occured
   */
  lastError: ErrorMessage|null;

  /**
   * The SSL certificate created by the backend process
   */
  certificate: Buffer|undefined;

  /**
   * Display an error in a native error dialog box
   *
   * @param title The error caption
   * @param msg The error message
   */
  showErrorDialog(title: string, msg: string|null): void;

  /**
   * Load the SSL certificate created by the backend process
   */
  loadCertificate(): void;
}

export default Bridge;
