import { app, dialog } from 'electron';
import rpc from '../transports/rpc/Rpc';
import messages from '../proto/rpc_pb';

class Core {

  // openMasterDb makes an RPC call to the backend, instructing it to open the master DB
  openMasterDb() {
    // Renderer process has to get `app` module via `remote`,
    // whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = app.getPath('userData');
    // caller is awaiting so we handle rejections immediately here
    const promise = new Promise((resolve) => {
      const message = new messages.OpenMasterDbRequest();
      message.setPath(userDataPath);
      const payload = message.serializeBinary();
      rpc.request('MasterDb::open', payload, (err, response, body) => {
        if (err !== null) {
          rpc.handleError('Fatal Error', 'Could not open database.');
          app.quit();
          return;
        }

        const responseMessage = messages.EmptyResponse.deserializeBinary(body);
        const header = responseMessage.getHeader();
        const status = header.getStatus();

        if (status !== 'OK') {
          dialog.showErrorBox('Fatal Error', 'Could not open database.');
          app.quit();
          return;
        }
        resolve(status);
      });
    });
    return promise;
  }

  // keyExchange makes an RPC call to the backend, sharing the message signing keys
  keyExchange() {
    const promise = new Promise((resolve) => {
      const message = new messages.KeyExchangeRequest();
      message.setPublickey(rpc.signPublicKey);
      const payload = message.serializeBinary();
      rpc.request('KeyExchange', payload, (err, response, body) => {
        if (err !== null) {
          rpc.handleError('Fatal Error', 'Key exchange error.');
          app.quit();
          return;
        }

        const responseMessage = messages.KeyExchangeResponse.deserializeBinary(body);
        const header = responseMessage.getHeader();
        const status = header.getStatus();
        if (status !== 'OK') {
          dialog.showErrorBox('Fatal Error', 'Key exchange error.');
          app.quit();
          return;
        }
        rpc.verifyPublicKey = responseMessage.getPublickey();
        resolve(status);
      });
    });
    return promise;
  }

  shutdown() {
  }
}

const core = new Core();

export default core;
