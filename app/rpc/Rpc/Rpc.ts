import {
  AjaxClient,
  NativeClient
} from '../Client';
import {
  Rpc as RpcInterface,
  Client as ClientInterface
} from '../../interfaces/rpc';

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
   *
   */
  client: ClientInterface;

  /**
   * The SSL certificate created by the backend process
   */
  certificate: Buffer|undefined;

  lastResponse: null;

  /**
   * Initialize the RPC system
   */
  constructor() {
    if (window === undefined) {
      this.client = new NativeClient();
    } else {
      this.client = new AjaxClient();
    }

    this.lastResponse = null;
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
    const response = await this.client.request('SERVICE-READY', null);

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
  async request(method: string, payload: Uint8Array): Promise<string> {
    const response = await this.client.request(method, payload);
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
  str2ab(str: string): Uint8Array {
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
}
