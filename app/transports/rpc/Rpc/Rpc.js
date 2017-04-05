import { dialog, app } from 'electron';
import path from 'path';
import fs from 'fs';
import request from 'request';
import nacl from 'tweetnacl';
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
  recvCounter = 0;
  sendCounter = 0;
  signPublicKey = null;
  signPrivateKey = null;
  verifyPublicKey = null;

  constructor() {
    this.registerTransports();
    this.loadCertificate();
    this.createKeys();
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

  // createKeys creates message signing keys
  createKeys() {
    let keyPair = nacl.sign.keyPair();
    this.signPublicKey = keyPair.publicKey;
    this.signPrivatekey = keyPair.secretKey;
    keyPair = null;
  }

  // loadCertificate loads the server's TLS certificate from disk
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

  // request makes an RPC request
  request(method, payload, callback) {
    const endpoint = 'https://' + RPC_PORT + '/rpc';
    this.sendCounter++;
    const signature = nacl.sign.detached(payload, this.signPrivateKey);
    const options = {
      uri: endpoint,
      method: 'POST',
      cert: this.certificate,
      ca: this.certificate,
      body: {
        method: method,
        sequence: this.sendCounter,
        signature: signature,
        payload: payload
      },
      json: true
    };
    request(options, (err, response, body) => {
      if (!this.verifyResponse(err, response, body)) {
        return;
      }
      callback(err, response, body);
    });
  }

  // verifyResponse verifies that a response is valid
  verifyResponse(err, response, body) {
    this.recvCounter++;
    if (body.sequence != this.recvCounter) {
      // [FIXME] - need to signal the error here
      console.log('unexpected response sequence');
      return false;
    }
    return true;
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
