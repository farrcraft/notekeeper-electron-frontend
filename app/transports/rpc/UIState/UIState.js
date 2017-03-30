import { dialog } from 'electron';
import rpc from '../Rpc';
import messages from '../../../proto/backend_pb';

export default class UIState {
  client = null;

  constructor() {
    this.client = rpc.getClient();
  }

  load() {
    const request = new messages.TokenRequest();
    const promise = new Promise((resolve, reject) => {
      this.client.uIState(request, (err, response) => {
        if (err !== null) {
          if (rpc.handleRpcError(err)) {
            return;
          }
          dialog.showErrorBox('Unknown Error', 'There was a problem restoring the UI state.');
          return;
        }
        const status = response.getStatus();
        if (status.getCode() !== 1) {
          dialog.showErrorBox('Internal Error', status.getStatus());
          reject(response);
          return;
        }
        resolve(response);
      });
    });
    return promise;
  }

  save(store) {
    const request = new messages.SaveUIStateRequest();
    request.setWindowwidth(store.windowWidth);
    request.setWindowheight(store.windowHeight);
    request.setWindowxposition(store.windowXPosition);
    request.setWindowyposition(store.windowYPosition);
    request.setWindowmaximized(store.windowMaximized);
    request.setWindowminimized(store.windowMinimized);
    request.setWindowfullscreen(store.windowFullscreen);
    request.setDisplayheight(store.displayHeight);
    request.setDisplaywidth(store.displayWidth);
    request.setDisplayxposition(store.displayXPosition);
    request.setDisplayyposition(store.displayYPosition);

    const promise = new Promise((resolve, reject) => {
      this.client.saveUIState(request, (err, response) => {
        if (err !== null) {
          if (rpc.handleRpcError(err)) {
            return;
          }
          dialog.showErrorBox('Unknown Error', 'There was a problem saving the UI state.');
          return;
        }
        if (response.getCode() !== 1) {
          dialog.showErrorBox('Internal Error', response.getStatus());
          reject(response);
          return;
        }
        resolve(response);
      });
    });
    return promise;
  }
}
