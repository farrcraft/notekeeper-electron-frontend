import request from 'request-promise-native';
import nacl from 'tweetnacl';
import base64js from 'base64-js';

import {
  AjaxRequest,
  NativeRequest
} from '../Request';
import { Rpc as RpcInterface } from '../../interfaces/rpc';
import InternalError from '../../core/InternalError';

const RPC_PORT = 'localhost:53017';
const RPC_ENDPOINT = `https://${RPC_PORT}/rpc`;

// type RpcRequestCallback = (response: request.Response, body: any) => void;
// import stream from 'stream';
// type ResponseBodyType = string|string[]|Buffer|Buffer[]|stream.Readable;

/**
 * The Rpc class is used to make RPC requests to the backend server process.
 * It only handles the outer message envelopes, transport, envelope signatures,
 * and any errors directly related to those processes.
 */
export default class Rpc implements RpcInterface {
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

  lastResponse: request.RequestPromise<any>|null;

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
    this.lastResponse = null;
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
   * Periodically poll the backend server until it is ready.
   * This will poll once per second for up to 10 seconds.
   */
  async waitForReady(): Promise<boolean> {
    let ok = this.backendReady();
    if (ok) {
      return true;
    }

    const sleep = (ms: number) => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    };

    for (let ticks = 10; ticks > 0; ticks--) {
      await sleep(1000);
      ok = this.backendReady();
      if (ok) {
        return true;
      }
    }
    return false;
  }

  /**
   * Make an RPC call to the backend to determine if it is ready.
   */
  async backendReady(): Promise<boolean> {
    // The backend generates the SSL cert on startup, so we can't enforce strict SSL yet
    const options: request.OptionsWithUri = {
      uri: RPC_ENDPOINT,
      method: 'POST',
      cert: this.certificate,
      ca: this.certificate,
      headers: {
        'NoteKeeper-Request-Method': 'SERVICE-READY'
      },
      json: false
    };
    try {
      const response = await request(options);
      if (response === 'OK') {
        return true;
      }
    }
    catch (_err) {
      // [FIXME]
    }
    return false;
  }

  /**
   * Make an RPC request
   *
   * @param method The API method name
   * @param payload
   * @param callback
   */
  async request(method: string, payload: Uint8Array): Promise<Uint8Array> {
    const req = new NativeRequest();
    const response = await req.request(method, payload);
    return response;
/*
    this.sendCounter += 1;
    const signature = this.createSignature(payload);
    const options: request.OptionsWithUri = {
      uri: RPC_ENDPOINT,
      method: 'POST', // the underlying HTTP request method is always POST
      cert: this.certificate,
      ca: this.certificate,
      headers: {
        'NoteKeeper-Message-Signature': signature,
        'NoteKeeper-Request-Method': method,
        'NoteKeeper-Message-Sequence': this.sendCounter,
        'NoteKeeper-Client-Token': this.clientToken,
      },
      resolveWithFullResponse: true, // We need access to the response headers
      body: payload,
      json: false
    };

    try {
      this.lastResponse = await request(options);
    }
    catch (err) {
      throw new InternalError('Service Error', err.message);
    }
    if (this.lastResponse === null) {
      return new Uint8Array();
    }
    if (method !== 'KeyExchange') {
      this.verifyResponse(this.lastResponse);
    }
    const buffer = new ArrayBuffer(this.lastResponse.body.length * 2);
    const view = new Uint8Array(buffer);
    return view;
*/
  }

  /**
   *
   * @param str
   */
  str2ab(str: string) : Uint8Array {
    /*
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    */
    const buffer = new ArrayBuffer(str.length * 2);
    const view = new Uint8Array(buffer);
    return view;
    /*
    const bytes = new Uint8Array(buf);
    const dv = new DataView(bytes.buffer);
    return dv.getUint8(0);
    */
  }

  /**
   *
   */
  verifyLastResponse(): void {
    if (this.lastResponse !== null) {
      this.verifyResponse(this.lastResponse);
    }
  }

  /**
   * Verify that a response is valid
   *
   * @param response
   */
  verifyResponse(response: request.RequestPromise<any>): void {
    // [FIXME] - we rely on message sequence counters (not just here, but also when making requests above)
    // If each process has its own rpc object (main/preload/renderer/etc), they'll each end up with their own
    // counters and nothing will be in the correct sequence to do proper message verification.
    // Maybe instead we should have the backend support registering multiple clients, so each one gets its own
    // key exchange and own distinct set of counters - each client then gets its own unique token as part of the key exchange
    // which is passed along in message headers to identify it and bind it to the correct keys & counters.
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
}
