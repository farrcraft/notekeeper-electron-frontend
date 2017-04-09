import { ipcMain } from 'electron';
import rpc from '../Rpc';
import messages from '../../../proto/rpc_pb';

export default class Account {
  store = null;

  constructor() {
    this.registerIpc();
  }

  setStore(store) {
    this.store = store;
  }

  // registerIpc registers IPC hooks mirroring the RPC calls
  registerIpc() {
    ipcMain.on('Account::create', (event, arg) => {
      const promise = this.create(arg.accountName, arg.email, arg.passphrase);
      promise.then((val) => {
        this.store.handleCreate(val);
        event.sender.send('Account::create', val);
        return val;
      })
      .catch((err) => {
        // [FIXME] - what does an err actually look like here?
        rpc.handleError(err);
      });
    });

    ipcMain.on('Account::getState', (event, arg) => {
      const promise = this.getState();
      promise.then((val) => {
        this.store.handleGetState(val);
        event.sender.send('Account::getState', val);
        return val;
      });
    });

    ipcMain.on('Account::signin', (event, arg) => {
      const promise = this.signin(arg.accountName, arg.email, arg.passphrase);
      promise.then((val) => {
        this.store.handleSignin(val);
        event.sender.send('Account::signin', val);
        return val;
      })
      .catch((err) => {
        // [FIXME] - what does an err actually look like here?
        rpc.handleError(err);
      });
    });

    ipcMain.on('Account::signout', (event, arg) => {
      const promise = this.signout();
      promise.then((val) => {
        event.sender.send('Account::signout', val);
        return val;
      });
    });

    ipcMain.on('Account::unlock', (event, arg) => {
      const promise = this.unlock(arg.passphrase);
      promise.then((val) => {
        event.sender.send('Account::unlock', val);
        return val;
      });
    });

    ipcMain.on('Account::lock', (event, arg) => {
      const promise = this.lock();
      promise.then((val) => {
        event.sender.send('Account::lock', val);
        return val;
      });
    });
  }

  // create makes an RPC request to create a new account
  create(name, email, passphrase) {
    const promise = new Promise((resolve, reject) => {
      const payload = {
        email: email,
        name: name,
        passphrase: passphrase
      };
      rpc.request('Account::create', payload, (err, response, body) => {
        if (err !== null) {
          dialog.showErrorBox('Unknown Error', 'There was a problem creating the account.');
          reject(err);
          return;
        }
        if (body.code !== 1) {
          dialog.showErrorBox('Internal Error', body.status);
          reject(body);
          return;
        }
        resolve(body);
      });
    });
    return promise;
  }

  // getState makes an RPC request to get the current account state
  getState() {
    const promise = new Promise((resolve, reject) => {
      const message = new messages.EmptyRequest();
      const messageHeader = new messages.RequestHeader();
      messageHeader.setMethod('UIState::load');
      message.setHeader(messageHeader);
      const payload = message.serializeBinary();
      rpc.request('AccountState::get', payload, (err, response, body) => {
        if (err !== null) {
          dialog.showErrorBox('Unknown Error', 'There was a problem getting the account state.');
          reject(err);
          return;
        }
        const responseMessage = messages.AccountStateResponse.deserializeBinary(body);
        const header = responseMessage.getHeader();
        const status = header.getStatus();
        if (status !== 'OK') {
          dialog.showErrorBox('Internal Error', status);
          reject(body);
          return;
        }
        const state = {};
        state.signedIn = responseMessage.getSignedin();
        state.locked = responseMessage.getLocked();
        state.exists = responseMessage.getExists();
        resolve(state);
      });
    });
    return promise;
  }

  // signin makes an RPC request to sign in to an account
  signin(name, email, passphrase) {
    const promise = new Promise((resolve, reject) => {
      const message = new messages.SigninAccountRequest();
      message.setName(name);
      message.setEmail(email);
      message.setPassphrase(passphrase);
      const payload = message.serializeBinary();
      rpc.request('Account::signin', payload, (err, response, body) => {
        if (err) {
          dialog.showErrorBox('Unknown Error', 'There was a problem signing in.');
          reject(err);
          return;
        }
        const responseMessage = messages.EmptyResponse.deserializeBinary(body);
        const header = responseMessage.getHeader();
        const status = header.getStatus();
        if (status !== 'OK') {
          dialog.showErrorBox('Internal Error', status);
          reject(header);
          return;
        }
        resolve(status);
      });
    });
    return promise;
  }

  // signout makes an RPC request to sign out from a signed in account
  signout() {
    const promise = new Promise((resolve, reject) => {
      const message = new messages.EmptyRequest();
      const messageHeader = new messages.RequestHeader();
      messageHeader.setMethod('Account::signout');
      message.setHeader(messageHeader);
      const payload = message.serializeBinary();
      rpc.request('Account::signout', payload, (err, response, body) => {
        if (err) {
          dialog.showErrorBox('Unknown Error', 'There was a problem signing out.');
          reject(err);
          return;
        }
        const responseMessage = messages.EmptyResponse.deserializeBinary(body);
        const header = responseMessage.getHeader();
        const status = header.getStatus();
        if (status !== 'OK') {
          dialog.showErrorBox('Internal Error', status);
          reject(status);
          return;
        }
        resolve(status);
      });
    });
    return promise;
  }

  // unlock makes an RPC request to unlock a locked account
  unlock(passphrase) {
    const promise = new Promise((resolve, reject) => {
      const message = new messages.UnlockAccountRequest();
      message.setPassphrase(passphrase);
      const payload = message.serializeBinary();
      rpc.request('Account::unlock', payload, (err, response, body) => {
        if (err) {
          dialog.showErrorBox('Unknown Error', 'There was a problem unlocking the account.');
          reject(err);
          return;
        }
        const responseMessage = messages.EmptyResponse.deserializeBinary(body);
        const header = responseMessage.getHeader();
        const status = header.getStatus();
        if (status !== 'OK') {
          dialog.showErrorBox('Internal Error', status);
          reject(status);
          return;
        }
        resolve(status);
      });
    });
    return promise;
  }

  // lock makes an RPC request to lock an unlocked account
  lock() {
    const promise = new Promise((resolve, reject) => {
      const message = new messages.EmptyRequest();
      const messageHeader = new messages.RequestHeader();
      messageHeader.setMethod('Account::lock');
      message.setHeader(messageHeader);
      const payload = message.serializeBinary();
      rpc.request('Account::lock', payload, (err, response, body) => {
        if (err) {
          dialog.showErrorBox('Unknown Error', 'There was a problem unlocking the account.');
          reject(err);
          return;
        }
        const responseMessage = messages.EmptyResponse.deserializeBinary(body);
        const header = responseMessage.getHeader();
        const status = header.getStatus();
        if (status !== 'OK') {
          dialog.showErrorBox('Internal Error', status);
          reject(status);
          return;
        }
        resolve(status);
      });
    });
    return promise;
  }
}
