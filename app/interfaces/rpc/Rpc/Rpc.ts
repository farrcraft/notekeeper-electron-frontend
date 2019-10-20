import Client from '../Client';

/**
 * The interface for making RPC requests to the backend process
 */
interface Rpc {
  /**
   *
   */
  client: Client;

  /**
   * The SSL certificate created by the backend process
   */
  certificate: Buffer|undefined;

  /**
   *
   * @param method
   * @param payload
   */
  request(method: string, payload: Uint8Array): Promise<string>;

  /**
   *
   * @param str
   */
  str2ab(str: string): Uint8Array;
}

export default Rpc;
