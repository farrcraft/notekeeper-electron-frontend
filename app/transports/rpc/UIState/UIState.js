import { default as rpc } from '../Rpc';
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
        // [FIXME] - error handling
        resolve(response);
      });
    });
    return promise;
  }

  save(store) {
    const request = new messages.SaveUIStateRequest();
    request.setWindowwidth(store.windowWidth);
    request.setWindowheight(store.windowHeight);
    const promise = new Promise((resolve, reject) => {
      this.client.saveUIState(request, (err, response) => {
        const status = response.getStatus();
        // [FIXME] - error handling
        if (status !== 'OK') {
        }
        resolve(response);
      });
    });
    return promise;
  }
}
