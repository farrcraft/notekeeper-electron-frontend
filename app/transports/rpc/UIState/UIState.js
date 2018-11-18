import { dialog } from 'electron';
import rpc from '../Rpc';
import messagesRpc from '../../../proto/rpc_pb';
import messagesUIState from '../../../proto/ui_state_pb';

export default class UIState {
  static load() {
    const message = new messagesRpc.EmptyRequest();
    const messageHeader = new messagesRpc.RequestHeader();
    messageHeader.setMethod('UIState::load');
    message.setHeader(messageHeader);
    const payload = message.serializeBinary();
    const promise = new Promise((resolve, reject) => {
      rpc.request('UIState::load', payload, (err, response, body) => {
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
        const header = responseMessage.getHeader();
        const status = header.getStatus();
        if (status !== 'OK') {
          dialog.showErrorBox('Internal Error', status);
          reject(body);
          return;
        }
        resolve(responseMessage);
      });
    });
    return promise;
  }

  static save(store) {
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
    const promise = new Promise((resolve, reject) => {
      rpc.request('UIState::save', payload, (err, response, body) => {
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
        const header = responseMessage.getHeader();
        const status = header.getStatus();
        if (status !== 'OK') {
          dialog.showErrorBox('Internal Error', status);
          reject(body);
          return;
        }
        resolve(status);
      });
    });
    return promise;
  }
}
