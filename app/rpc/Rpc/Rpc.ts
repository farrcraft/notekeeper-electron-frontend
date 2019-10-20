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

  /**
   * Initialize the RPC system
   */
  constructor() {
    if (typeof window === 'undefined') {
      this.client = new NativeClient();
    } else {
      this.client = new AjaxClient();
    }
  }

  /**
   * Periodically poll the backend server until it is ready.
   * This will poll once per second for up to 10 seconds.
   */
  async waitForReady(): Promise<boolean> {
    console.log('is backend ready?');
    let ok = await this.backendReady();
    /*
    ok.then((result) => {
      if (result === true) {
        console.log('backend then was ok');
      } else {
        console.log('backend then not ok');
      }
    });
    */
    if (ok === true) {
      console.log('backend was ready');
      return true;
    }
console.log('need to sleep on it');
    const sleep = (ms: number) => {
      console.log('sleeping');
      return new Promise((resolve) => {
        console.log('setting next stage');
        setTimeout(() => { console.log('timed out'); resolve(); }, ms);
      });
    };

    for (let ticks = 10; ticks > 0; ticks--) {
      console.log('going to sleep');
      await sleep(1000);
      console.log('tick');
      ok = await this.waitForReady();
      if (ok === true) {
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
    // [FIXME] - we need to tell the client not to enforce strict ssl checks on this request
    const response = await this.client.request('SERVICE-READY', null);
    return response;
    /*
    response.then((result) => {
console.log('response then ' + result);
    }).catch((err) => {
console.log('response caught ' + err.code);
    });
    const promise = new Promise<boolean>((resolve) => {
      if (response === 'OK') {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch((err) => {
      if (err.code === 'ECANCELED') {
console.log('CAUGHT CANCELED!');
      }
      return false;
    });
    return promise;
    */
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
    if (response === true && this.client.lastResponse !== null) {
      return this.client.lastResponse.body;
    }
    return '';
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
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      view[i] = str.charCodeAt(i);
    }
    return view;
    /*
    const bytes = new Uint8Array(buf);
    const dv = new DataView(bytes.buffer);
    return dv.getUint8(0);
    */
  }
}
