import { default as rpc } from '../Rpc';
import messages from '../../proto/backend_pb';
import { ipcMain } from 'electron';

export default class Account {
  client = null;

  constructor() {
    console.log('constructing account transport');
    this.client = rpc.getClient();

    console.log('main listening');
    ipcMain.on('Account::getState', (event, arg) => {
      console.log('main got message');
      const promise = this.getState();
      promise.then((val) => {
        console.log('ipc responding to sender with account state');
        event.sender.send('Account::getState', val);
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
    console.log('transport getting state');
    const request = new messages.TokenRequest();
    const promise = new Promise((resolve, reject) => {
      console.log('making request');
      this.client.accountState(request, (err, response) => {
        // [FIXME] - error handling
        const state = {};
        state.signedIn = response.getSignedin();
        state.locked = response.getLocked();
        console.log(response);
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
