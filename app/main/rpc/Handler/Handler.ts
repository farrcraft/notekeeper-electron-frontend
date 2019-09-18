import { ipcMain, IpcMain } from 'electron';
import IStore from '../../../renderer/interfaces/Store';
import Rpc from '../Rpc';

/**
 * The base handler that individual rpc handlers should extend from.
 */
export default class Handler {
  /**
   * The IPC listener
   */
  listener: IpcMain = null;

  /**
   * The backing store for the rpc handler
   */
  store: IStore = null;

  /**
   * The main rpc interface
   */
  rpc: Rpc = null;

  /**
   * Whether the status of the last RPC response that was checked was OK or not
   */
  isOK: boolean = true;

  constructor() {
    this.listener = ipcMain;
  }

  setStore(store: IStore): void {
    this.store = store;
  }

  setRpc(rpc: Rpc): void {
    this.rpc = rpc;
  }

  checkResponseStatus(message, reject): boolean {
    const header = message.getHeader();
    const status = header.getStatus();
    if (status !== 'OK') {
      const code = header.getCode();
      const err = `RPC error code - ${code}`;
      reject(err);
      this.isOK = false;
      return false;
    }
    this.isOK = true;
    return true;
  }
}
