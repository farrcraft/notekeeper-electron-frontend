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
}

export default Rpc;
