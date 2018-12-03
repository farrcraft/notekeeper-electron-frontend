import { app, dialog } from 'electron';
import Handler from '../Handler';
import Logger from '../../../shared/Logger';
import messagesKex from '../../../proto/kex_pb';

export default class Kex extends Handler {
  // keyExchange makes an RPC call to the backend, sharing the message signing keys
  keyExchange() {
    const promise = new Promise(resolve => {
      const message = new messagesKex.KeyExchangeRequest();
      message.setPublickey(this.rpc.signPublicKey);
      const payload = message.serializeBinary();
      this.rpc.request('KeyExchange', payload, (err, response, body) => {
        if (err !== null) {
          Logger.debug(err);
          this.rpc.handleError('Fatal Error', 'Key exchange error.');
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
        this.rpc.verifyPublicKey = responseMessage.getPublickey();
        resolve(status);
      });
    });
    return promise;
  }
}
