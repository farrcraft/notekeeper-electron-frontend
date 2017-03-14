import rpc from '../Rpc';
import messages from '../../proto/backend_pb';

export default class UIState {
  client = null;

  constructor() {
    this.client = rpc.getClient();
    console.log('constructed uistate transport');
  }

  load() {
    console.log('loading ui state');
    const request = new messages.TokenRequest();
    const promise = new Promise((resolve, reject) => {
      console.log('promising ui state');
      this.client.uIState(request, (err, response) => {
        console.log(err);
        console.log('recieved uistate response');
        console.log(response);
        // [FIXME] - error handling
        resolve(response);
      });
    });
    return promise;
  }

  static save() {
    const request = new messages.SaveUIStateRequest();
    // [FIXME] - need to get correct dims here
    request.setWindowWidth();
    request.setWindowHeight();
    const client = rpc.getClient();
    const promise = new Promise((resolve, reject) => {
      client.saveUIState(request, (err, response) => {
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
