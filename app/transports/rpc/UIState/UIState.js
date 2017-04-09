import { dialog } from 'electron';
import rpc from '../Rpc';
import messages from '../../../proto/rpc_pb';

export default class UIState {

  load() {
    const message = new messages.EmptyRequest();
    const messageHeader = new messages.RequestHeader();
    messageHeader.setMethod('UIState::load');
    message.setHeader(messageHeader);
    const payload = message.serializeBinary();
    const promise = new Promise((resolve, reject) => {
      rpc.request('UIState::load', payload, (err, response, body) => {
        if (err !== null) {
          dialog.showErrorBox('Unknown Error', 'There was a problem restoring the UI state.');
          return;
        }

        const responseMessage = messages.LoadUIStateResponse.deserializeBinary(body);
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

  save(store) {
    const message = new messages.SaveUIStateRequest();
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
          dialog.showErrorBox('Unknown Error', 'There was a problem saving the UI state.');
          return;
        }
        const responseMessage = messages.EmptyResponse.deserializeBinary(body);
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
