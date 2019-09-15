import Ipc from '../Ipc';

export default class Note extends Ipc {
  create(name): Promise {
    const promise = new Promise((resolve /* , reject */): void => {
      this.dispatcher.on('Note::create', (event, arg): void => {
        resolve(arg);
      });
      this.dispatchMessage('Note::create', name);
    });
    return promise;
  }
}
