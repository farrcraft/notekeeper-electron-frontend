import nacl from 'tweetnacl';
import base64js from 'base64-js';

/**
 *
 */
class Request {
  /**
   * The number of messages that have been received from the backend
   */
  recvCounter: number = 0;

  /**
   * The number of messages sent to the backend
   */
  sendCounter: number = 0;

  /**
   * The public key used for request message signing
   */
  signPublicKey: Uint8Array;

  /**
   * The private key used for request message signing
   */
  signPrivateKey: Uint8Array;

  /**
   * The backend server's public key used for verifying response messages.
   * we get this via Key Exchange (KEX)
   */
  verifyPublicKey: Uint8Array;

  /**
   *
   */
  clientToken: string;

  /**
   * The SSL certificate created by the backend process
   */
  certificate: Buffer|undefined;

  /**
   * Initialize the RPC system
   */
  constructor() {
    // create the message signing keys
    let keyPair: nacl.SignKeyPair|null = nacl.sign.keyPair();
    this.signPublicKey = keyPair.publicKey;
    this.signPrivateKey = keyPair.secretKey;
    this.verifyPublicKey = new Uint8Array();
    this.clientToken = 'Empty';
    keyPair = null;
  }

  /**
   * Create the signature for a request message
   *
   * @param payload The body of the request message
   */
  createSignature(payload: Uint8Array): string {
    const signature = nacl.sign.detached(payload, this.signPrivateKey);
    const rebased = base64js.fromByteArray(signature);
    return rebased;
  }

  /**
   *
   * @param str
   */
  str2ab(str: string) : Uint8Array {
    const buffer = new ArrayBuffer(str.length * 2);
    const view = new Uint8Array(buffer);
    return view;
  }
}

export default Request;
