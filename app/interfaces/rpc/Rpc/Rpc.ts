import request from 'request-promise-native';

/**
 * The interface for making RPC requests to the backend process
 */
interface Rpc {
  /**
   * The number of messages that have been received from the backend
   */
  recvCounter: number;

  /**
   * The number of messages sent to the backend
   */
  sendCounter: number;

  /**
   * The public key used for message signing
   */
  signPublicKey: Uint8Array;

  /**
   * The private key used for message signing
   */
  signPrivateKey: Uint8Array;

  /**
   * The public key from the backend for verifying message signatures
   */
  verifyPublicKey: Uint8Array|null;

  /**
   *
   */
  clientToken: string;

  /**
   *
   * @param method
   * @param payload
   */
  request(method: string, payload: Uint8Array): Promise<Uint8Array>;

  /**
   *
   * @param str
   */
  str2ab(str: string) : Uint8Array;

  /**
   *
   * @param payload
   */
  createSignature(payload: Uint8Array): string;

  /**
   *
   * @param signature
   * @param payload
   */
  verifySignature(signature: string, payload: string): boolean;

  /**
   *
   */
  verifyLastResponse(): void;

  /**
   *
   * @param response
   */
  verifyResponse(response: request.RequestPromise<any>): void;
}

export default Rpc;
