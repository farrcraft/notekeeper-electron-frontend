import Handler from '../Handler';
import rpc from '../Rpc';
// import messages from '../../../proto/rpc_pb';

export default class Note extends Handler {
  /**
   * Creates an instance of Note.
   *
   * @memberOf Note
   */
  constructor() {
    super();
    this.registerIpc();
  }

  /**
   * registerIpc registers IPC hooks mirroring the RPC calls
   *
   *
   * @memberOf Note
   */
  registerIpc() {
    this.listener.on('Note::create', (event /* , arg */) => {
      const promise = createNote();
      promise
        .then(val => {
          this.store.handleCreate(val);
          event.sender.send('Note::create', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });

    this.listener.on('Note::list', (/* event, arg */) => {});

    this.listener.on('Note::save', (/* event, arg */) => {});

    this.listener.on('Note::get', (/* event, arg */) => {});

    this.listener.on('Note::delete', (/* event, arg */) => {});
  }
}

/**
 * createNote makes an RPC call to create a new note
 */
function createNote() {}
