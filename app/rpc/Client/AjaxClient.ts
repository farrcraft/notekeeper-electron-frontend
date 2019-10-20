import { Endpoint } from '../Rpc';
import Client from './Client';

class AjaxClient extends Client {
  request(method: string, payload: Uint8Array|null): Promise<boolean> {
    const req = new XMLHttpRequest();
    const promise = new Promise<boolean>((resolve): void => {
      req.onreadystatechange = () => {
        try {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
              // resolve(req.responseText);
              resolve(true);
            } else {
              // [FIXME] - throw
              resolve(false);
            }
          }
        } catch (err) {
          resolve(false);
          // [FIXME] - rethrow
        }
      };

      this.sendCounter += 1;

      // 3rd param = async - true/false
      req.open('POST', Endpoint.endpoint, false);

      req.setRequestHeader('NoteKeeper-Request-Method', method);
      req.setRequestHeader('NoteKeeper-Message-Sequence', this.sendCounter.toString());
      req.setRequestHeader('NoteKeeper-Client-Token', this.clientToken);

      if (payload !== null) {
        const signature = this.createSignature(payload);
        req.setRequestHeader('NoteKeeper-Message-Signature', signature);
      }

      req.send(payload);
    });
    return promise;
  }
}

export default AjaxClient;
