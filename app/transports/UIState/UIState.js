import rpc from '../Rpc';
import messages from '../../proto/backend_pb';

export default class UIState {
  static load() {
    const request = new messages.UIStateRequest();
    const client = rpc.getClient();
    client.UIState(reuqest, (err, response) => {
    });
  }

  static save() {
    const request = new messages.SaveUIStateRequest();
    // request.setPath(userDataPath);
    const client = rpc.getClient();
    client.SaveUIState(request, (err, response) => {
      const status = response.getStatus();
      if (status !== 'OK') {
      }
    });
  }
}
