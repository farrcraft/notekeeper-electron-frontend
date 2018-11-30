import Ipc from '../Ipc';

export default class List extends Ipc {
  accountShelves() {
    const promise = new Promise((resolve /* , reject */) => {
      this.dispatcher.on('Account::shelves', (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage('Account::shelves');
    });
    return promise;
  }

  userShelves() {
    const promise = new Promise((resolve /* , reject */) => {
      this.dispatcher.on('User::shelves', (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage('User::shelves');
    });
    return promise;
  }
}
