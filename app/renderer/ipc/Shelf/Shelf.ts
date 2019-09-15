import Ipc from '../Ipc';

export default class Shelf extends Ipc {
  list(shelfType): Promise {
    const handler = shelfType === 'account' ? 'Account::shelves' : 'User::shelves';
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on(handler, (event, arg): void => {
        resolve(arg);
      });
      this.dispatchMessage(handler);
    });
    return promise;
  }
}
