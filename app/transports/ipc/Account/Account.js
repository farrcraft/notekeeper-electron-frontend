import { ipcRenderer } from 'electron';

/**
 * This is the Account IPC transport
 * It mirrors requests to the RPC transport.
 */
export default class Account {
  dispatcher

  constructor() {
    this.dispatcher = ipcRenderer;
  }

  /**
   * Dispatch IPC message
   */
  dispatchMessage(channel, msg) {
    this.dispatcher.send(channel, msg);
  }

  /**
   * Get the current account state
   */
  getState() {
    // [FIXME] - use real token
    const token = 'secure token';
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Account::getState', (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage('Account::getState', token);
    });
    return promise;
  }

  /**
   * Create a new account
   * @param {*} accountName
   * @param {*} email
   * @param {*} passphrase
   */
  create(accountName, email, passphrase) {
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Account::create', (event, arg) => {
        resolve(arg);
      });
      const msg = {
        accountName,
        email,
        passphrase
      };
      this.dispatchMessage('Account::create', msg);
    });
    return promise;
  }

  signin(accountName, email, passphrase) {
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Account::signin', (event, arg) => {
        resolve(arg);
      });
      const msg = {
        accountName,
        email,
        passphrase
      };
      this.dispatchMessage('Account::signin', msg);
    });
    return promise;
  }

  signout() {
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Account::signout', (event, arg) => {
        resolve(arg);
      });
      const msg = {

      };
      this.dispatchMessage('Account::signout', msg);
    });
    return promise;
  }

  lock() {
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Account::lock', (event, arg) => {
        resolve(arg);
      });
      const msg = {

      };
      this.dispatchMessage('Account::lock', msg);
    });
    return promise;
  }

  unlock(passphrase) {
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Account::unlock', (event, arg) => {
        resolve(arg);
      });
      const msg = {
        passphrase
      };
      this.dispatchMessage('Account::unlock', msg);
    });
    return promise;
  }
}
