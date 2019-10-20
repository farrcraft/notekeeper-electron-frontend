import {
  Headers as HeadersInterface,
  Response as ResponseInterface
} from '../../interfaces/rpc';

/**
 *
 */
class Response implements ResponseInterface {
  /**
   *
   */
  body: string;

  headers: HeadersInterface;

  /**
   *
   */
  constructor() {
    this.body = '';
    this.headers = {};
  }
}

export default Response;
