import Ipc from '../Ipc';

export default class Collection extends Ipc {
  /*
  create(name) {
    const promise = new Promise((resolve, reject) => {
      this.dispatcher.on('Note::create', (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage('Note::create', name);
    });
    return promise;
  }
  */

  accountCollections(): Promise {
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('Account::collections', (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage('Account::collections');
    });
    return promise;
  }

  userCollections(): Promise {
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('User::collections', (event, arg): void => {
        resolve(arg);
      });
      this.dispatchMessage('User::collections');
    });
    return promise;
  }
}
