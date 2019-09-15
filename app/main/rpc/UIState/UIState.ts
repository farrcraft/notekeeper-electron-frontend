import { dialog } from 'electron';
import Handler from '../Handler';
import messagesRpc from '../../../proto/rpc_pb';
import messagesUIState from '../../../proto/ui_state_pb';

export default class UIState extends Handler {
  lastStatus;

  checkResponseHeader(responseMessage): boolean {
    const header = responseMessage.getHeader();
    this.lastStatus = header.getStatus();
    if (this.lastStatus !== 'OK') {
      dialog.showErrorBox('Internal Error', this.lastStatus);
      return false;
    }
    return true;
  }

  load(): Promise {
    const message = new messagesRpc.EmptyRequest();
    const messageHeader = new messagesRpc.RequestHeader();
    messageHeader.setMethod('UIState::load');
    message.setHeader(messageHeader);
    const payload = message.serializeBinary();
    const promise = new Promise((resolve, reject): void => {
      this.rpc.request('UIState::load', payload, (err, response, body) => {
        if (err !== null) {
          dialog.showErrorBox(
            'Unknown Error',
            'There was a problem restoring the UI state.'
          );
          return;
        }

        const responseMessage = messagesUIState.LoadUIStateResponse.deserializeBinary(
          body
        );
        if (!this.checkResponseHeader(responseMessage)) {
          reject(body);
          return;
        }
        resolve(responseMessage);
      });
    });
    return promise;
  }

  save(store): Promise {
    const message = new messagesUIState.SaveUIStateRequest();
    message.setWindowwidth(store.windowWidth);
    message.setWindowheight(store.windowHeight);
    message.setWindowxposition(store.windowXPosition);
    message.setWindowyposition(store.windowYPosition);
    message.setWindowmaximized(store.windowMaximized);
    message.setWindowminimized(store.windowMinimized);
    message.setWindowfullscreen(store.windowFullscreen);
    message.setDisplayheight(store.displayHeight);
    message.setDisplaywidth(store.displayWidth);
    message.setDisplayxposition(store.displayXPosition);
    message.setDisplayyposition(store.displayYPosition);
    const payload = message.serializeBinary();
    const promise = new Promise((resolve, reject): void => {
      this.rpc.request('UIState::save', payload, (err, response, body) => {
        if (err !== null) {
          dialog.showErrorBox(
            'Unknown Error',
            'There was a problem saving the UI state.'
          );
          return;
        }
        const responseMessage = messagesRpc.EmptyResponse.deserializeBinary(
          body
        );
        if (!this.checkResponseHeader(responseMessage)) {
          reject(body);
          return;
        }
        resolve(this.lastStatus);
      });
    });
    return promise;
  }
}
