import { ipcRenderer } from 'electron';

export default class Note {
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
      ipcRenderer.on('Note::create', (event, arg) => {
        resolve(arg);
      });
      ipcRenderer.send('Note::create', name);
    });
    return promise;
  }
}
