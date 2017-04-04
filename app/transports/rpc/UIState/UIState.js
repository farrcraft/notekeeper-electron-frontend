import { dialog } from 'electron';
import rpc from '../Rpc';

export default class UIState {

  load() {
    const payload = {};
    const promise = new Promise((resolve, reject) => {
      rpc.request('UIState::load', payload, (err, response, body) => {
        if (err !== null) {
          dialog.showErrorBox('Unknown Error', 'There was a problem restoring the UI state.');
          return;
        }
        if (body.code !== 1) {
          dialog.showErrorBox('Internal Error', body.status);
          reject(body);
          return;
        }
        resolve(body);
      });
    });
    return promise;
  }

  save(store) {
    const payload = {
      window_width: store.windowWidth,
      window_height: store.windowHeight,
      window_x_position: store.windowXPosition,
      window_y_position: store.windowYPosition,
      window_maximized: store.windowMaximized,
      window_minimized: store.windowMinimized,
      window_fullscreen: store.windowFullscreen,
      display_height: store.displayHeight,
      display_width: store.displayWidth,
      display_x_position: store.displayXPosition,
      display_y_position: store.displayYPosition
    };
    const promise = new Promise((resolve, reject) => {
      rpc.request('UIState::save', payload, (err, response, body) => {
        if (err !== null) {
          dialog.showErrorBox('Unknown Error', 'There was a problem saving the UI state.');
          return;
        }
        if (body.code !== 1) {
          dialog.showErrorBox('Internal Error', response.getStatus());
          reject(body);
          return;
        }
        resolve(body);
      });
    });
    return promise;
  }
}
