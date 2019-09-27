import dialog from 'electron';

class ErrorHandler {

  error(title: string, msg: string|null) {
    if (dialog) {
      this.showErrorDialog(title, msg);
    }
  }

  /**
   * Show a native error dialog box
   * This only works in main or preload
   *
   * @param title Error dialog caption
   * @param msg Error message
   */
  showErrorDialog(title: string, msg: string|null): void {
    if (msg === null) {
      this.lastError = {
        title: 'Internal Error',
        message: title
      };
    } else {
      this.lastError = {
        title,
        message: msg
      };
    }
    dialog.showErrorBox(this.lastError.title, this.lastError.message);
  }
}

export default ErrorHandler;
