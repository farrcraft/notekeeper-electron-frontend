import { dialog, app } from 'electron';
import path from 'path';
import fs from 'fs';
import request from 'request';
import AccountTransport from '../Account';
import NotebookTransport from '../Notebook';
import NoteTransport from '../Note';
import TagTransport from '../Tag';
import TrashTransport from '../Trash';
import accountStore from '../../../stores/Account';

const RPC_PORT = 'localhost:53017';

class Rpc {
  certificate = null;
  transports = {};

  constructor() {
    this.registerTransports();
    this.loadCertificate();
  }

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

  loadCertificate() {
    const certPath = path.join(app.getPath('userData'), 'certificate');
    try {
      this.certificate = fs.readFileSync(certPath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('certificate file does not exist');
      } else if (err.code === 'EACCESS') {
        console.log('certificate file permission denied');
      } else {
        console.log('certificate error - ', err);
      }
    }
  }

  request(method, payload, callback) {
    const endpoint = 'https://' + RPC_PORT + '/rpc';
    const options = {
      uri: endpoint,
      method: 'POST',
      cert: this.certificate,
      ca: this.certificate,
      body: {
        method: method,
        payload: payload
      },
      json: true
    };
    request(options, callback);
  }

  handleRpcError(err) {
    return false;
  }

  handleError(title, msg) {
    dialog.showErrorBox(title, msg);
  }
}

const rpcTransport = new Rpc();

export default rpcTransport;
