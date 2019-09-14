import { dialog, app } from 'electron';
import path from 'path';
import fs from 'fs';
import request from 'request';
import nacl from 'tweetnacl';
import base64js from 'base64-js';

const RPC_PORT = 'localhost:53017';

export default class Rpc {
  certificate = null;

  transports = {};

  recvCounter = 0;

  sendCounter = 0;

  signPublicKey = null;

  signPrivateKey = null;

  verifyPublicKey = null;

  lastError = {};

  constructor() {
    this.createKeys();
  }

  registerTransport(name, transport) {
    transport.setRpc(this);
    this.transports[name] = transport;
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
        this.handleError(
          'Certificate Error',
          'Certificate file does not exist'
        );
      } else if (err.code === 'EACCESS') {
        this.handleError(
          'Certificate Error',
          'Certificate file permission denied'
        );
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
    const ok = nacl.sign.detached.verify(
      decodedPayload,
      decodedSignature,
      this.verifyPublicKey
    );
    return ok;
  }

  waitForReady(ticks, ready) {
    this.backendReady(ok => {
      if (!ok) {
        setTimeout(() => {
          if (ticks === 0) {
            ready(true);
            return;
          }
          this.waitForReady(ticks - 1, ready);
        }, 1000);
      } else {
        ready(true);
      }
    });
  }

  backendReady(callback) {
    const endpoint = `https://${RPC_PORT}/rpc`;
    const options = {
      uri: endpoint,
      method: 'POST',
      strictSSL: false,
      headers: {
        'NoteKeeper-Request-Method': 'SERVICE-READY'
      },
      rejectUnauthorized: false,
      json: false
    };
    request(options, (err, response, body) => {
      if (err != null) {
        callback(false);
        return;
      }
      if (body === 'OK') {
        this.loadCertificate();
        callback(true);
        return;
      }
      callback(false);
    });
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
      if (err !== null) {
        this.handleRequestError(err);
        return;
      }
      if (method !== 'KeyExchange') {
        if (!this.verifyResponse(err, response, body)) {
          return;
        }
      }

      callback(err, response, body);

      if (method === 'KeyExchange') {
        if (!this.verifyResponse(err, response, body)) {
          // return;
        }
      }
    });
  }

  handleRequestError(err) {
    this.handleError('Service Error', err.message);
  }

  // verifyResponse verifies that a response is valid
  verifyResponse(err, response, body) {
    this.recvCounter += 1;
    if (!('notekeeper-message-sequence' in response.headers)) {
      this.handleError('Transport Error', 'Missing sequence header');
      return false;
    }
    const sequence = parseInt(
      response.headers['notekeeper-message-sequence'],
      10
    );
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
      this.handleError(
        'Transport Error',
        'Failed to verify response signature'
      );
      return false;
    }

    return true;
  }

  handleError(title, msg) {
    this.lastError.title = title;
    this.lastError.message = msg;
    if (msg === undefined || msg === null) {
      this.lastError.message = title;
      this.lastError.title = 'Internal Error';
    }
    dialog.showErrorBox(this.lastError.title, this.lastError.message);
  }
}
