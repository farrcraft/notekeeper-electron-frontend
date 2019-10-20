import * as https from 'https';
import * as http from 'http';

import { Endpoint } from '../Rpc';
import { Response } from '../Response';
import Client from './Client';

/**
 * This is a native request using the built-in nodejs modules
 */
class NativeClient extends Client {
  /**
   * Make an API request
   * The direct response is not returned, but can be accessed from the client
   * after the returned promise has been fulfilled.
   *
   * @param method
   * @param payload
   * @returns a promise indicating whether the request was successful or not
   */
  request(method: string, payload: Uint8Array|null): Promise<boolean> {
    this.sendCounter += 1;
    const options: https.RequestOptions = {
      hostname: Endpoint.host,
      port: Endpoint.port,
      path: Endpoint.path,
      method: 'POST'
    };
console.log('requesting ' + method);
    if (this.certificate !== undefined) {
      options.cert = this.certificate;
      options.ca = this.certificate;
    } else {
      // we haven't loaded the cert yet, so ignore the ssl errors on this request
      options.rejectUnauthorized = false;
    }
    options.headers = {
      'NoteKeeper-Request-Method': method,
      'NoteKeeper-Message-Sequence': this.sendCounter,
      'NoteKeeper-Client-Token': this.clientToken,
    };
    let requestBody = '';
    if (payload !== null) {
      const signature = this.createSignature(payload);
      options.headers['NoteKeeper-Message-Signature'] = signature;
      requestBody = payload.toString();
    }

    const promise = new Promise<boolean>((resolve): void => {
      const req = https.request(options, (response: http.IncomingMessage): void => {
        response.setEncoding('utf8');
        const body: Array<string> = [];
        // response.statusCode
        response.on('data', (chunk) => {
console.log('data');
          body.push(chunk);
        });
        response.on('end', () => {
console.log('end');
          this.lastResponse = new Response();
          this.lastResponse.body = body.join('');
          this.lastResponse.headers = response.headers
          if (response.statusCode === 200) {
            this.lastError = null;
            resolve(true);
          } else {
            resolve(false);
            // [FIXME] - handle error
          }
        });
      });
      req.on('error', (err) => {
console.log('error in request');
// console.log(err);
        this.lastError = err;
        resolve(false);
      });
      req.write(requestBody);
      req.end();
    });
    return promise;
  }
}

export default NativeClient;
