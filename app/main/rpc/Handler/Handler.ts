import { ipcMain } from 'electron';

/**
 * The base handler that individual rpc handlers should extend from.
 */
export default class Handler {
  /**
   * The IPC listener
   */
  listener = null;

  /**
   * The backing store for the rpc handler
   */
  store = null;

  /**
   * The main rpc interface
   */
  rpc = null;

  /**
   * Whether the status of the last RPC response that was checked was OK or not
   */
  isOK = true;

  constructor() {
    this.listener = ipcMain;
  }

  setStore(store) {
    this.store = store;
  }

  setRpc(rpc) {
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
