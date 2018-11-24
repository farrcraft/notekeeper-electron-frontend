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
}
