import { dialog, app } from 'electron';
import path from 'path';
import fs from 'fs';
import request from 'request';
import nacl from 'tweetnacl';
import base64js from 'base64-js';
import { TextEncoder, TextDecoder } from 'text-encoding';
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
        console.log('certificate file does not exist');
      } else if (err.code === 'EACCESS') {
        console.log('certificate file permission denied');
      } else {
        console.log('certificate error - ', err);
      }
    }
  }

  uint8ToString(u8a) {
    const CHUNK_SZ = 0x8000;
    const c = [];
    for (let i = 0; i < u8a.length; i += CHUNK_SZ) {
      c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
    }
    return c.join('');
  }

  createSignature(payload) {
    // const encoder = new TextEncoder('utf-8');
    // const arr = encoder.encode(payload);
    const signature = nacl.sign.detached(payload, this.signPrivateKey);
    console.log('signature');
    console.log(signature);
    // return signature;
    const decoder = new TextDecoder('utf-8');
    const decoded = decoder.decode(signature);
    const compare = this.uint8ToString(signature);
    console.log('compare');
    console.log(compare);
    if (decoded !== compare) {
      console.log('different!');
    }
    console.log('decoded');
    console.log(decoded);
    // const buf = new Buffer(decoded);
    const buf = new Buffer(compare);
    const recoded = buf.toString('base64');
    console.log('recoded');
    console.log(recoded);

    const rebased = base64js.fromByteArray(signature);
    console.log('rebased');
    console.log(rebased);

    return rebased;
  }

  // request makes an RPC request
  request(method, payload, callback) {
    const endpoint = `https://${RPC_PORT}/rpc`;
    this.sendCounter += 1;

    // try doing json serialization first & then signing the base64 representation:
    // const buf = new Buffer(JSON.stringify(payload));
    // const encPayload = buf.toString('base64');
    // btoa doesn't exist in nodejs context, so this doesn't work:
    // const encPayload = btoa(JSON.stringify(payload));
    const signature = this.createSignature(payload);

    // const signature = this.createSignature(JSON.stringify(payload));
    const options = {
      uri: endpoint,
      method: 'POST',
      cert: this.certificate,
      ca: this.certificate,
      headers: {
        'NoteKeeper-Request-Signature': signature,
        'NoteKeeper-Request-Method': method
      },
      body: payload,
      json: false
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
    this.recvCounter += 1;
    /*
    if (body.sequence !== this.recvCounter) {
      // [FIXME] - need to signal the error here
      console.log('unexpected response sequence');
      return false;
    }
    */
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
