import { ipcRenderer } from 'electron';

/**
 * This is the Account IPC transport
 * It mirrors requests to the RPC transport.
 */
export default class Account {
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
      ipcRenderer.send('Account::getState', token);
    });
    return promise;
  }

  /**
   * Create a new account
   * @param {*} accountName 
   * @param {*} email 
   * @param {*} password 
   */
  create(accountName, email, password) {
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Account::create', (event, arg) => {
        resolve(arg);
      });
      const msg = {
        accountName: accountName,
        email: email,
        password: password
      };
      ipcRenderer.send('Account::create', msg);
    });
    return promise;
  }
}
