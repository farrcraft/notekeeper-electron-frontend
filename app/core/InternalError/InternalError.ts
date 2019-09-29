import { InternalError as InternalErrorInterface } from '../../interfaces/core';

/**
 *
 */
class InternalError extends Error implements InternalErrorInterface {
  /**
   *
   * @param title
   * @param msg
   */
  constructor(title: string, msg: string) {
    super(msg);
    this.name = title;
  }
}

export default InternalError;
