import { Response as ResponseInterface } from '../../interfaces/rpc';

/**
 *
 */
class Response implements ResponseInterface {
  /**
   *
   */
  body: string;

  /**
   *
   */
  constructor() {
    this.body = '';
  }
}

export default Response;
