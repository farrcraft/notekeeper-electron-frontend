import Handler from '../Handler';

export default class Shelf extends Handler {
  /*
  constructor() {
    super();
    this.registerIpc();
  }

  // registerIpc registers IPC hooks mirroring the RPC calls
  registerIpc() {
    this.listener.on('Account::shelves', event => {
      // const promise = signoutAccount();
      promise
        .then(val => {
          event.sender.send('Account::shelves', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });
  }
  */
}
