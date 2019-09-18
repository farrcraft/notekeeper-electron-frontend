import { IpcRenderer } from 'electron';

export default class Ipc {
  dispatcher: IpcRenderer

  constructor() {
    this.dispatcher = window.Bridge.ipc;
  }

  /**
   * Dispatch IPC message
   */
  dispatchMessage(channel: string, msg): void {
    this.dispatcher.send(channel, msg);
  }
}
