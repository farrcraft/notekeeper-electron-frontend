import Handler from '../Handler';
import rpc from '../Rpc';
import messages from '../../../proto/rpc_pb';

export default class Notebook extends Handler {
  /**
   * Creates an instance of Notebook.
   *
   * @memberOf Notebook
   */
  constructor() {
    super();
    this.registerIpc();
  }

  /**
   * registerIpc registers IPC hooks mirroring the RPC calls
   *
   *
   * @memberOf Notebook
   */
  registerIpc() {
    this.listener.on('Notebook::create', (event, arg) => {
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

    this.listener.on('Notebook::list', (event, arg) => {

    });

    this.listener.on('Notebook::load', (event, arg) => {

    });

    this.listener.on('Notebook::save', (event, arg) => {

    });

    this.listener.on('Notebook::delete', (event, arg) => {

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
