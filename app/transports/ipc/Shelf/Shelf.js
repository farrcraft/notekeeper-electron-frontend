import Ipc from '../Ipc';

export default class Shelf extends Ipc {
  list(shelfType) {
    const handler =
      shelfType === 'account' ? 'Account::shelves' : 'User::shelves';
    const promise = new Promise((resolve /* , reject */) => {
      this.dispatcher.on(handler, (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage(handler);
    });
    return promise;
  }
}
