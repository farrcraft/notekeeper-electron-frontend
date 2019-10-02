/**
 * The interface for making RPC requests to the backend process
 */
interface Rpc {
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

  /**
   *
   */
  verifyLastResponse(): void;
}

export default Rpc;
