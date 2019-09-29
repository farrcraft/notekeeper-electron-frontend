import { dialog } from 'electron';

import { ErrorHandler as ErrorHandlerInterface } from '../../interfaces/core';
import InternalError from '../InternalError';

/**
 *
 */
class ErrorHandler implements ErrorHandlerInterface {
  /**
   *
   */
  lastError: InternalError|null;

  /**
   *
   */
  constructor() {
    this.lastError = null;
  }

  /**
   *
   * @param err
   */
  error(err: InternalError): void {
    this.lastError = err;
    if (dialog) {
      this.showErrorDialog();
    }
  }

  /**
   * Show a native error dialog box
   * This only works in main or preload
   *
   */
  showErrorDialog(): void {
    if (this.lastError === null) {
      return;
    }
    dialog.showErrorBox(this.lastError.name, this.lastError.message);
  }
}

export default ErrorHandler;
