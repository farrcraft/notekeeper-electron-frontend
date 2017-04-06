import { app, dialog } from 'electron';
import { TextDecoder } from 'text-encoding';
import rpc from '../transports/rpc/Rpc';

class Core {

  // openMasterDb makes an RPC call to the backend, instructing it to open the master DB
  openMasterDb() {
    // Renderer process has to get `app` module via `remote`,
    // whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = app.getPath('userData');
    // caller is awaiting so we handle rejections immediately here
    const promise = new Promise((resolve) => {
      const payload = {
        path: userDataPath
      };
      rpc.request('MasterDb::open', payload, (err, response, body) => {
        console.log(body);
        if (err !== null) {
          rpc.handleError('Fatal Error', 'Could not open database.');
          app.quit();
          return;
        }
        if (body.status !== 'OK') {
          dialog.showErrorBox('Fatal Error', 'Could not open database.');
          app.quit();
          return;
        }
        resolve(body.status);
      });
    });
    return promise;
  }

  // keyExchange makes an RPC call to the backend, sharing the message signing keys
  keyExchange() {
    const promise = new Promise((resolve) => {
      const decoder = new TextDecoder('utf-8');
      const key = decoder.decode(rpc.signPublicKey);
      const payload = {
        public_key: key
      };
      rpc.request('KeyExchange', payload, (err, response, body) => {
        if (err !== null) {
          rpc.handleError('Fatal Error', 'Key exchange error.');
          app.quit();
          return;
        }
        if (body.status !== 'OK') {
          dialog.showErrorBox('Fatal Error', 'Key exchange error.');
          app.quit();
          return;
        }
        rpc.verifyPublicKey = body.payload.public_key;
        resolve(body.status);
      });
    });
    return promise;
  }

  shutdown() {
  }
}

const core = new Core();

export default core;
