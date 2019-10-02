import * as https from 'https';
import * as http from 'http';

import Request from './Request';

/**
 * This is a native request using the built-in nodejs modules
 */
class NativeRequest extends Request {

  request(method: string, payload: Uint8Array): Promise<string> {
    this.sendCounter += 1;
    const signature = this.createSignature(payload);

    const options: https.RequestOptions = {
      hostname: 'localhost',
      port: 53017,
      path: '/rpc',
      method: 'POST'
    };

    if (this.certificate !== undefined) {
      options.cert = this.certificate;
      options.ca = this.certificate;
    } else {
      // we haven't loaded the cert yet, so ignore the ssl errors on this request
      options.rejectUnauthorized = false;
    }
    options.headers = {
      'NoteKeeper-Message-Signature': signature,
      'NoteKeeper-Request-Method': method,
      'NoteKeeper-Message-Sequence': this.sendCounter,
      'NoteKeeper-Client-Token': this.clientToken,
    };
    const promise = new Promise<string>((resolve, reject): void => {
      const req = https.request(options, (response: http.IncomingMessage): void => {
        response.setEncoding('utf8');
        const body: Array<string> = [];
        // response.statusCode
        response.on('data', (chunk) => {
          body.push(chunk);
        });
        response.on('end', () => {
          if (response.statusCode === 200) {
            resolve(body.join(''));
          } else {
            // [FIXME] - handle error
          }
        });
      });
      req.on('error', (err) => {
        reject(err);
      });
      req.write(payload);
      req.end();
    });
    return promise;
  }
}

export default NativeRequest;
