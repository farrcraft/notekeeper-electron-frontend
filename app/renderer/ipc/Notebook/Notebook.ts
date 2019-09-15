import Ipc from '../Ipc';

export default class Notebook extends Ipc {
  create(title): Promise {
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('Notebook::create', (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage('Notebook::create', title);
    });
    return promise;
  }
}
