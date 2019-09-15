import { app, dialog } from 'electron';
import Handler from '../Handler';
import messagesRpc from '../../../proto/rpc_pb';
import messagesDb from '../../../proto/db_pb';

export default class Db extends Handler {
  openMasterDb(): Promise {
    // Renderer process has to get `app` module via `remote`,
    // whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = app.getPath('userData');
    // caller is awaiting so we handle rejections immediately here
    const promise = new Promise((resolve): void => {
      const message = new messagesDb.OpenMasterDbRequest();
      message.setPath(userDataPath);
      const payload = message.serializeBinary();
      this.rpc.request('MasterDb::open', payload, (err, response, body) => {
        if (err !== null) {
          this.rpc.handleError('Fatal Error', 'Could not open database.');
          app.quit();
          return;
        }

        const responseMessage = messagesRpc.EmptyResponse.deserializeBinary(
          body
        );
        const header = responseMessage.getHeader();
        const status = header.getStatus();

        if (status !== 'OK') {
          dialog.showErrorBox('Fatal Error', 'Could not open database.');
          app.quit();
          return;
        }
        resolve(status);
      });
    });
    return promise;
  }
}
