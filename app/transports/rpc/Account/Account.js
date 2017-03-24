import { default as rpc } from '../Rpc';
import messages from '../../../proto/backend_pb';
import { ipcMain } from 'electron';

export default class Account {
  client = null;

  constructor() {
    this.client = rpc.getClient();
    this.registerIpc();
  }

  // registerIpc registers IPC hooks mirroring the RPC calls
  registerIpc() {
    ipcMain.on('Account::create', (event, arg) => {
      const promise = this.create(arg.accountName, arg.email, arg.password);
      promise.then((val) => {
        event.sender.send('Account::create', val);
      });
    });

    ipcMain.on('Account::getState', (event, arg) => {
      const promise = this.getState();
      promise.then((val) => {
        event.sender.send('Account::getState', val);
      });
    });

    ipcMain.on('Account::signin', (event, arg) => {
      const promise = this.create(arg.name, arg.email, arg.passphrase);
      promise.then((val) => {
        event.sender.send('Account::signin', val);
      });
    });

    ipcMain.on('Account::signout', (event, arg) => {
      const promise = this.signout();
      promise.then((val) => {
        event.sender.send('Account::signout', val);
      });
    });

    ipcMain.on('Account::unlock', (event, arg) => {
      const promise = this.unlock();
      promise.then((val) => {
        event.sender.send('Account::unlock', val);
      });
    });

    ipcMain.on('Account::lock', (event, arg) => {
      const promise = this.lock();
      promise.then((val) => {
        event.sender.send('Account::lock', val);
      });
    });
  }

  // create makes an RPC request to create a new account
  create(name, email, passphrase) {
    const request = new messages.CreateAccountRequest();
    request.setName(name);
    request.setEmail(email);
    request.setPassphrase(passphrase);
    const promise = new Promise((resolve, reject) => {
      this.client.createAccount(request, (err, response) => {
        // [FIXME] - error handling
        const status = response.getStatus();
        if (status !== 'OK') {
        }
        resolve(response);
      });
    });
    return promise;
  }

  // getState makes an RPC request to get the current account state
  getState() {
    const request = new messages.TokenRequest();
    const promise = new Promise((resolve, reject) => {
      this.client.accountState(request, (err, response) => {
        // [FIXME] - error handling
        const state = {};
        state.signedIn = response.getSignedin();
        state.locked = response.getLocked();
        state.exists = response.getExists();
        resolve(state);
      });
    });
    return promise;
  }

  // signin makes an RPC request to sign in to an account
  signin() {
    const request = new messages.SigninAccountRequest();
    const promise = new Promise((resolve, reject) => {
      this.client.signinAccount(request, (err, response) => {
        // [FIXME] - error handling
        resolve(response);
      });
    });
    return promise;
  }

  // signout makes an RPC request to sign out from a signed in account
  signout() {
    const request = new messages.IdRequest();
    const promise = new Promise((resolve, reject) => {
      this.client.signoutAccount(request, (err, response) => {
        // [FIXME] - error handling
        resolve(response);
      });
    });
    return promise;
  }

  // unlock makes an RPC request to unlock a locked account
  unlock() {
    const request = new messages.UnlockAccountRequest();
    const promise = new Promise((resolve, reject) => {
      this.client.unlockAccount(request, (err, response) => {
        // [FIXME] - error handling
        resolve(response);
      });
    });
    return promise;
  }

  // lock makes an RPC request to lock an unlocked account
  lock() {
    const request = new messages.IdRequest();
    const promise = new Promise((resolve, reject) => {
      this.client.lockAccount(request, (err, response) => {
        // [FIXME] - error handling
        resolve(response);
      });
    });
    return promise;
  }
}
