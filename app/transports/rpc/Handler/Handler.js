import { dialog, app } from 'electron';
import path from 'path';
import fs from 'fs';
import request from 'request';
import nacl from 'tweetnacl';
import base64js from 'base64-js';
import AccountTransport from '../Account';
import NotebookTransport from '../Notebook';
import NoteTransport from '../Note';
import TagTransport from '../Tag';
import TrashTransport from '../Trash';
import accountStore from '../../../stores/Account';

const RPC_PORT = 'localhost:53017';

class Handler {
  certificate = null;
  transports = {};
  recvCounter = 0;
  sendCounter = 0;
  signPublicKey = null;
  signPrivateKey = null;
  verifyPublicKey = null;
  lastError = {};

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
    this.signPrivateKey = keyPair.secretKey;
    keyPair = null;
  }

  // loadCertificate loads the server's TLS certificate from disk
  loadCertificate() {
    const certPath = path.join(app.getPath('userData'), 'certificate');
    try {
      this.certificate = fs.readFileSync(certPath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        this.handleError('Certificate Error', 'Certificate file does not exist');
      } else if (err.code === 'EACCESS') {
        this.handleError('Certificate Error', 'Certificate file permission denied');
      } else {
        this.handleError('Certificate Error', err);
      }
    }
  }

  createSignature(payload) {
    const signature = nacl.sign.detached(payload, this.signPrivateKey);
    const rebased = base64js.fromByteArray(signature);
    return rebased;
  }

  verifySignature(signature, payload) {
    const decodedSignature = base64js.toByteArray(signature);
    const decodedPayload = base64js.toByteArray(payload);
    const ok = nacl.sign.detached.verify(decodedPayload, decodedSignature, this.verifyPublicKey);
    return ok;
  }

  // request makes an RPC request
  request(method, payload, callback) {
    const endpoint = `https://${RPC_PORT}/rpc`;
    this.sendCounter += 1;

    const signature = this.createSignature(payload);
    const options = {
      uri: endpoint,
      method: 'POST',
      cert: this.certificate,
      ca: this.certificate,
      headers: {
        'NoteKeeper-Message-Signature': signature,
        'NoteKeeper-Request-Method': method,
        'NoteKeeper-Message-Sequence': this.sendCounter
      },
      body: payload,
      json: false
    };

    request(options, (err, response, body) => {
      if (method !== 'KeyExchange') {
        if (!this.verifyResponse(err, response, body)) {
          return;
        }
      }

      callback(err, response, body);

      if (method === 'KeyExchange') {
        if (!this.verifyResponse(err, response, body)) {
          return;
        }
      }
    });
  }

  // verifyResponse verifies that a response is valid
  verifyResponse(err, response, body) {
    this.recvCounter += 1;
    if (!('notekeeper-message-sequence' in response.headers)) {
      this.handleError('Transport Error', 'Missing sequence header');
      return false;
    }
    const sequence = parseInt(response.headers['notekeeper-message-sequence'], 10);
    if (sequence !== this.recvCounter) {
      this.handleError('Transport Error', 'Unexpected sequence');
      return false;
    }

    if (!('notekeeper-message-signature' in response.headers)) {
      this.handleError('Transport Error', 'Missing message signature');
      return false;
    }

    const signature = response.headers['notekeeper-message-signature'];
    if (!this.verifySignature(signature, body)) {
      this.handleError('Transport Error', 'Failed to verify response signature');
      return false;
    }

    return true;
  }

  handleError(title, msg) {
    this.lastError.title = title;
    this.lastError.message = msg;
    dialog.showErrorBox(title, msg);
  }
}

const rpcHandler = new Handler();

export default rpcHandler;
