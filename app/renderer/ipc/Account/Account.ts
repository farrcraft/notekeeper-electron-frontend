import Ipc from '../Ipc';

/**
 * This is the Account IPC transport
 * It mirrors requests to the RPC transport.
 */
export default class Account extends Ipc {
  /**
   * Get the current account state
   */
  getState(): Promise {
    // [FIXME] - use real token
    const token = 'secure token';
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('Account::getState', (event, arg) => {
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
  create(accountName: string, email: string, passphrase: string): Promise {
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('Account::create', (event, arg) => {
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

  signin(accountName: string, email: string, passphrase: string): Promise {
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('Account::signin', (event, arg) => {
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

  signout(): Promise {
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('Account::signout', (event, arg) => {
        resolve(arg);
      });
      const msg = {};
      this.dispatchMessage('Account::signout', msg);
    });
    return promise;
  }

  lock(): Promise {
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('Account::lock', (event, arg) => {
        resolve(arg);
      });
      const msg = {};
      this.dispatchMessage('Account::lock', msg);
    });
    return promise;
  }

  unlock(passphrase: string): Promise {
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('Account::unlock', (event, arg) => {
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
