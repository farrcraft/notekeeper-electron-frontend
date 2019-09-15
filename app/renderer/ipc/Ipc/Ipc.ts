export default class Ipc {
  dispatcher

  constructor() {
    this.dispatcher = window.Bridge.ipc; // import { ipcRenderer } from 'electron';
  }

  /**
   * Dispatch IPC message
   */
  dispatchMessage(channel, msg) {
    this.dispatcher.send(channel, msg);
  }
}
