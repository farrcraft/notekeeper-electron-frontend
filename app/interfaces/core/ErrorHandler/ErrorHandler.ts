import InternalError from '../InternalError';

/**
 *
 */
interface ErrorHandler {
  /**
   *
   */
  lastError: InternalError|null;

  /**
   *
   * @param title
   * @param msg
   */
  error(title: string, msg: string|null): void;

  /**
   *
   * @param title
   * @param msg
   */
  showErrorDialog(title: string, msg: string|null): void;
}

export default ErrorHandler;
