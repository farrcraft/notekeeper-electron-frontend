// [FIXME] - this import causes webpack to blow up
import { default as rpc } from '../Rpc';
//import messages from '../../proto/backend_pb';

export default class Account {
  client = null;

/*
  constructor() {
    this.client = rpc.getClient();
  }

  // create makes an RPC request to create a new account
  create(name, email, passphrase) {
    const request = new messages.CreateAccountRequest();
    request.setName(name);
    request.setEmail(email);
    request.setPassphrase(passphrase);
    const promise = new Promise((resolve, reject) => {
      this.client.CreateAccount(request, (err, response) => {
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
  getState(store) {
    const request = new messages.TokenRequest();
    const promise = new Promise((resolve, reject) => {
      this.client.AccountState(request, (err, response) => {
        // [FIXME] - error handling
        store.signedIn = response.getSignedin();
        store.locked = response.getLocked();
        console.log(response);
        resolve();
      });
    });
    return promise;
  }

  // signin makes an RPC request to sign in to an account
  signin() {
    const request = new messages.SigninAccountRequest();
    const promise = new Promise((resolve, reject) => {
      this.client.SigninAccount(request, (err, response) => {
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
      this.client.SignoutAccount(request, (err, response) => {
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
      this.client.UnlockAccount(request, (err, response) => {
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
      this.client.LockAccount(request, (err, response) => {
        // [FIXME] - error handling
        resolve(response);
      });
    });
    return promise;
  }
*/
}
