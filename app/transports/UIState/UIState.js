import rpc from '../Rpc';
import messages from '../../proto/backend_pb';

export default class UIState {
  static load() {
    const request = new messages.UIStateRequest();
    const client = rpc.getClient();
    const promise = new Promise((resolve, reject) => {
      client.UIState(request, (err, response) => {
        // [FIXME] - error handling
        resolve(response);
      });
    });
    return promise;
  }

  static save() {
    const request = new messages.SaveUIStateRequest();
    // [FIXME]
    request.setWindowWidth();
    request.setWindowHeight();
    const client = rpc.getClient();
    const promise = new Promise((resolve, reject) => {
      client.SaveUIState(request, (err, response) => {
        const status = response.getStatus();
        // [FIXME]
        if (status !== 'OK') {
        }
        resolve(response);
      });
    });
    return promise;
  }
}
