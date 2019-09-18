import Handler from '../Handler';
import Transport from '../../interfaces/Transport';
// import messages from '../../../proto/rpc_pb';

/**
 * createNotebook makes an RPC call to create a new notebook
 *
 */
function createNotebook(): void {
  console.log('MISSING IMPLEMENTATION!');
}

export default class Notebook extends Handler implements Transport {
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
  registerIpc(): void {
    this.listener.on('Notebook::create', (event /* , arg */) => {
      const promise = createNotebook();
      promise
        .then(val => {
          this.store.handleCreate(val);
          event.sender.send('Notebook::create', val);
          return val;
        })
        .catch(err => {
          this.rpc.handleError(err);
        });
    });

    this.listener.on('Notebook::list', (/* event, arg */) => {});

    this.listener.on('Notebook::load', (/* event, arg */) => {});

    this.listener.on('Notebook::save', (/* event, arg */) => {});

    this.listener.on('Notebook::delete', (/* event, arg */) => {});
  }
}
