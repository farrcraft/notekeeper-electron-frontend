import { ipcRenderer } from 'electron';

export default class Ipc {
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
}
