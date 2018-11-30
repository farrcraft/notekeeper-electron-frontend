import Ipc from '../Ipc';

export default class List extends Ipc {
  accountCollections() {
    const promise = new Promise((resolve /* , reject */) => {
      this.dispatcher.on('Account::collections', (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage('Account::collections');
    });
    return promise;
  }

  userCollections() {
    const promise = new Promise((resolve /* , reject */) => {
      this.dispatcher.on('User::collections', (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage('User::collections');
    });
    return promise;
  }
}
