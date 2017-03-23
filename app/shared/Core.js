import { app, dialog } from 'electron';
import messages from '../proto/backend_pb';
import { default as rpc } from '../transports/rpc/Rpc';

class Core {
  client = null;

  constructor() {
    this.client = rpc.getClient();
  }

  // openMasterDb makes an RPC call to the backend, instructing it to open the master DB
  openMasterDb() {
    // Renderer process has to get `app` module via `remote`,
    // whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = app.getPath('userData');
    const request = new messages.OpenMasterDbRequest();
    request.setPath(userDataPath);
    const promise = new Promise((resolve, reject) => {
      this.client.openMasterDb(request, (err, response) => {
        const status = response.getStatus();
        if (status !== 'OK') {
          dialog.showErrorBox('Fatal Error', 'Could not open database.');
          app.quit();
        }
        resolve(status);
      });
    });
    return promise;
  }

  shutdown() {
    rpc.close();
  }
}

const core = new Core();

export default core;