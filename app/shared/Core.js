import { app, dialog } from 'electron';
import { Logger } from '.';
import rpc from '../transports/rpc/Rpc';
import messagesRpc from '../proto/rpc_pb';
import messagesDb from '../proto/db_pb';
import messagesKex from '../proto/kex_pb';

class Core {
  // openMasterDb makes an RPC call to the backend, instructing it to open the master DB
  static openMasterDb() {
    // Renderer process has to get `app` module via `remote`,
    // whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = app.getPath('userData');
    // caller is awaiting so we handle rejections immediately here
    const promise = new Promise(resolve => {
      const message = new messagesDb.OpenMasterDbRequest();
      message.setPath(userDataPath);
      const payload = message.serializeBinary();
      rpc.request('MasterDb::open', payload, (err, response, body) => {
        if (err !== null) {
          rpc.handleError('Fatal Error', 'Could not open database.');
          app.quit();
          return;
        }

        const responseMessage = messagesRpc.EmptyResponse.deserializeBinary(
          body
        );
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

  static waitForReady(ticks, ready) {
    rpc.backendReady(ok => {
      if (!ok) {
        setTimeout(() => {
          if (ticks === 0) {
            ready(true);
            return;
          }
          Core.waitForReady(ticks - 1, ready);
        }, 1000);
      } else {
        ready(true);
      }
    });
  }

  // keyExchange makes an RPC call to the backend, sharing the message signing keys
  static keyExchange() {
    const promise = new Promise(resolve => {
      const message = new messagesKex.KeyExchangeRequest();
      message.setPublickey(rpc.signPublicKey);
      const payload = message.serializeBinary();
      rpc.request('KeyExchange', payload, (err, response, body) => {
        if (err !== null) {
          Logger.debug(err);
          rpc.handleError('Fatal Error', 'Key exchange error.');
          app.quit();
          return;
        }

        const responseMessage = messagesKex.KeyExchangeResponse.deserializeBinary(
          body
        );
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

  static shutdown() {}
}

export default Core;
