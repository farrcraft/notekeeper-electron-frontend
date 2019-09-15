import Handler from '../Handler';
import messagesShelf from '../../../proto/shelf_pb';

export default class Shelf extends Handler {
  constructor() {
    super();
    this.registerIpc();
  }

  // registerIpc registers IPC hooks mirroring the RPC calls
  registerIpc() {
    this.listener.on('Account::shelves', event => {
      const promise = this.getAccountShelves();
      promise
        .then(val => {
          event.sender.send('Account::shelves', val);
          return val;
        })
        .catch(err => {
          this.rpc.handleError(err);
        });
    });

    this.listener.on('User::shelves', event => {
      const promise = this.getUserShelves();
      promise
        .then(val => {
          event.sender.send('User::shelves', val);
          return val;
        })
        .catch(err => {
          this.rpc.handleError(err);
        });
    });
  }

  getAccountShelves(accountId) {
    const promise = new Promise((resolve, reject) => {
      const message = new messagesShelf.GetShelvesRequest();
      message.setId(accountId);
      message.setScope('account');
      const payload = message.serializeBinary();
      this.rpc.request('Account::shelves', payload, (err, response, body) => {
        if (err !== null) {
          reject(err);
          return;
        }
        const responseMessage = messagesShelf.GetShelvesResponse.deserializeBinary(
          body
        );
        const ok = this.checkResponseStatus(responseMessage, reject);
        if (ok) {
          resolve(ok);
        }
      });
    });
    return promise;
  }

  getUserShelves(userId) {
    const promise = new Promise((resolve, reject) => {
      const message = new messagesShelf.GetShelvesRequest();
      message.setId(userId);
      message.setScope('user');
      const payload = message.serializeBinary();
      this.rpc.request('User::shelves', payload, (err, response, body) => {
        if (err !== null) {
          reject(err);
          return;
        }
        const responseMessage = messagesShelf.GetShelvesResponse.deserializeBinary(
          body
        );
        const ok = this.checkResponseStatus(responseMessage, reject);
        if (ok) {
          resolve(ok);
        }
      });
    });
    return promise;
  }
}
