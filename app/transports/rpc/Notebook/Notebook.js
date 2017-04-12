import { ipcMain } from 'electron';
import rpc from '../Rpc';
import messages from '../../../proto/rpc_pb';

export default class Notebook {
  store = null;

  /**
   * Creates an instance of Notebook.
   *
   * @memberOf Notebook
   */
  constructor() {
    this.registerIpc();
  }

  /**
   * setStore sets the store this transport operates on
   *
   * @param {any} store
   *
   * @memberOf Notebook
   */
  setStore(store) {
    this.store = store;
  }

  /**
   * registerIpc registers IPC hooks mirroring the RPC calls
   *
   *
   * @memberOf Notebook
   */
  registerIpc() {
    ipcMain.on('Notebook::create', (event, arg) => {
      const promise = this.create();
      promise.then((val) => {
        this.store.handleCreate(val);
        event.sender.send('Notebook::create', val);
        return val;
      })
      .catch((err) => {
        rpc.handleError(err);
      });
    });

    ipcMain.on('Notebook::list', (event, arg) => {

    });

    ipcMain.on('Notebook::load', (event, arg) => {

    });

    ipcMain.on('Notebook::save', (event, arg) => {

    });

    ipcMain.on('Notebook::delete', (event, arg) => {

    });
  }

  /**
   * create makes an RPC call to create a new notebook
   *
   *
   * @memberOf Notebook
   */
  create() {
  }
}
