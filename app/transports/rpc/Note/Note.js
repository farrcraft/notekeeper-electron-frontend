import { ipcMain } from 'electron';
import rpc from '../Rpc';
import messages from '../../../proto/rpc_pb';

export default class Note {
  store = null;

  /**
   * Creates an instance of Note.
   *
   * @memberOf Note
   */
  constructor() {
    this.registerIpc();
  }

  /**
   * setStore sets the store this transport operates on
   *
   * @param {any} store
   *
   * @memberOf Note
   */
  setStore(store) {
    this.store = store;
  }

  /**
   * registerIpc registers IPC hooks mirroring the RPC calls
   *
   *
   * @memberOf Note
   */
  registerIpc() {
    ipcMain.on('Note::create', (event, arg) => {
      const promise = this.create();
      promise.then((val) => {
        this.store.handleCreate(val);
        event.sender.send('Note::create', val);
        return val;
      })
      .catch((err) => {
        rpc.handleError(err);
      });
    });
  }

  /**
   * create makes an RPC call to create a new note
   *
   * @memberOf Note
   */
  create() {
  }
}
