import { ipcRenderer } from 'electron';

export default class Notebook {
  dispatcher

  constructor() {
    this.dispatcher = ipcRenderer;
  }

  /**
   * Dispatch IPC message
   */
  dispatchMessage(channel, msg) {
    this.dispatcher.send(channel, msg);
  }

  create(name) {
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Notebook::create', (event, arg) => {
        resolve(arg);
      });
      ipcRenderer.send('Notebook::create', name);
    });
    return promise;
  }
}
