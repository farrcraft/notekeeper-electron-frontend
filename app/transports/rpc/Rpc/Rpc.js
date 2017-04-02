import { dialog, app } from 'electron';
import grpc from 'grpc';
import path from 'path';
import fs from 'fs';
import services from '../../../proto/backend_grpc_pb';
import AccountTransport from '../Account';
import NotebookTransport from '../Notebook';
import NoteTransport from '../Note';
import TagTransport from '../Tag';
import TrashTransport from '../Trash';
import accountStore from '../../../stores/Account';

const RPC_PORT = 'localhost:53017';

process.env['GRPC_SSL_CIPHER_SUITES'] = 'HIGH+ECDSA';
console.log(process.versions);

class Rpc {
  client
  transports = {};

  // registerTransports instantiates all of the available RPC transport classes
  registerTransports() {
    this.transports.account = new AccountTransport();
    this.transports.notebook = new NotebookTransport();
    this.transports.note = new NoteTransport();
    this.transports.tag = new TagTransport();
    this.transports.trash = new TrashTransport();

    // we mirror the store in the main process in order to track some account state
    this.transports.account.setStore(accountStore);
  }

  getTransport(transport) {
    return this.transports[transport];
  }

  async getClient() {
    console.log('getting client');
    if (!this.client) {
      // [FIXME] - need to use proper grpc TLS credentials here
      const certPath = path.join(app.getPath('userData'), 'certificate');
      console.log('getting cert from: ' + certPath);
      let cert
      try {
        cert = fs.readFileSync(certPath);
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log('certificate file does not exist');
        } else if (err.code === 'EACCESS') {
          console.log('certificate file permission denied');
        } else {
          console.log('certificate error - ' + err);
        }
      }
      const creds = grpc.credentials.createSsl(cert);
      console.log(cert);
      this.client = new services.BackendClient(RPC_PORT, creds);
      await this.readyWait();
      // this.client = new services.BackendClient(RPC_PORT, grpc.credentials.createInsecure());
    }
    return this.client;
  }

  readyWait() {
    const deadline = new Date();
    const deadlineInSeconds = 2;
    deadline.setSeconds(deadline.getSeconds()+deadlineInSeconds);
    const promise = new Promise((resolve, reject) => {
      console.log('going to wait');
      grpc.waitForClientReady(this.client, deadline, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      });
    });
    return promise;
  }

  handleRpcError(err) {
    // https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
    if (err.code === grpc.status.UNAVAILABLE) {
      this.handleError('Service Unavailable.', 'The NoteKeeper.io service is not running.');
      return true;
    }
    return false;
  }

  handleError(title, msg) {
    dialog.showErrorBox(title, msg);
  }

  close() {
    if (this.client) {
      grpc.closeClient(this.client);
      this.client = null;
    }
  }
}

const rpcTransport = new Rpc();

export default rpcTransport;
