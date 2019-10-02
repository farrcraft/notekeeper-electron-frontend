import nacl from 'tweetnacl';
import base64js from 'base64-js';

import {
  Client as ClientInterface,
  Response as ResponseInterface
} from '../../interfaces/rpc';
import { InternalError } from '../../core';

/**
 *
 */
class Client implements ClientInterface {
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

  lastResponse: ResponseInterface|null;

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
    this.lastResponse = null;
  }

  request(_method: string, _payload: Uint8Array): Promise<string> {
    const response = new Promise<string>(() => {});
    return response;
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
   * Verify the signature of a response message
   *
   * @param signature The response message signature
   * @param payload The message body
   */
  verifySignature(signature: string, payload: string): boolean {
    const decodedSignature = base64js.toByteArray(signature);
    const decodedPayload = base64js.toByteArray(payload);
    const ok = nacl.sign.detached.verify(
      decodedPayload,
      decodedSignature,
      this.verifyPublicKey
    );
    return ok;
  }

  /**
   * Verify that a response is valid
   *
   * @param response
   */
  verifyResponse(response: ResponseInterface): void {
    // [FIXME] - we rely on message sequence counters (not just here, but also when making
    // requests above)
    // If each process has its own rpc object (main/preload/renderer/etc), they'll each end up
    // with their own counters and nothing will be in the correct sequence to do proper message
    // verification.
    // Maybe instead we should have the backend support registering multiple clients, so each
    // one gets its own key exchange and own distinct set of counters - each client then gets
    // its own unique token as part of the key exchange which is passed along in message headers
    // to identify it and bind it to the correct keys & counters.
    this.recvCounter += 1;
    if (!('notekeeper-message-sequence' in response.headers)) {
      throw new InternalError('Transport Error', 'Missing sequence header');
    }
    const sequence = parseInt(
      response.headers['notekeeper-message-sequence'] as string,
      10
    );
    if (sequence !== this.recvCounter) {
      throw new InternalError('Transport Error', 'Unexpected sequence');
    }

    if (!('notekeeper-message-signature' in response.headers)) {
      throw new InternalError('Transport Error', 'Missing message signature');
    }

    const signature = response.headers['notekeeper-message-signature'] as string;
    if (!this.verifySignature(signature, response.body.toString())) {
      throw new InternalError('Transport Error', 'Failed to verify response signature');
    }
  }

  /**
   *
   * @param str
   */
  str2ab(str: string): Uint8Array {
    const buffer = new ArrayBuffer(str.length * 2);
    const view = new Uint8Array(buffer);
    return view;
  }
}

export default Client;
