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
   * @param err
   */
  error(err: InternalError): void;

  /**
   * Show a native error dialog box
   * This only works in main or preload
   *
   */
  showErrorDialog(): void;
}

export default ErrorHandler;
