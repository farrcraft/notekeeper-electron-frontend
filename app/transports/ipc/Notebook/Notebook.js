import Ipc from '../Ipc';

export default class Notebook extends Ipc {
  create(name) {
    const promise = new Promise((resolve, reject) => {
      this.dispatcher.on('Notebook::create', (event, arg) => {
        resolve(arg);
      });
      this.dispatchMessage('Notebook::create', name);
    });
    return promise;
  }
}
