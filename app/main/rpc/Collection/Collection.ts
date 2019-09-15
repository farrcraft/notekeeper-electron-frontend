import Handler from '../Handler';
import messagesCollection from '../../../proto/collection_pb';

export default class Collection extends Handler {
  constructor() {
    super();
    this.registerIpc();
  }

  // registerIpc registers IPC hooks mirroring the RPC calls
  registerIpc() {
    this.listener.on('Account::collections', event => {
      const promise = this.getAccountCollections();
      promise
        .then(val => {
          event.sender.send('Account::collections', val);
          return val;
        })
        .catch(err => {
          this.rpc.handleError(err);
        });
    });

    this.listener.on('User::collections', event => {
      const promise = this.getUserCollections();
      promise
        .then(val => {
          event.sender.send('User::collections', val);
          return val;
        })
        .catch(err => {
          this.rpc.handleError(err);
        });
    });
  }

  getAccountCollections(shelfId) {
    const promise = new Promise((resolve, reject) => {
      const message = new messagesCollection.GetCollectionsRequest();
      message.setShelfid(shelfId);
      message.setScope('account');
      const payload = message.serializeBinary();
      this.rpc.request(
        'Account::collections',
        payload,
        (err, response, body) => {
          if (err !== null) {
            reject(err);
            return;
          }
          const responseMessage = messagesCollection.GetCollectionsResponse.deserializeBinary(
            body
          );
          const ok = this.checkResponseStatus(responseMessage, reject);
          if (ok) {
            resolve(ok);
          }
        }
      );
    });
    return promise;
  }

  getUserCollections(shelfId) {
    const promise = new Promise((resolve, reject) => {
      const message = new messagesCollection.GetCollectionsRequest();
      message.setShelfid(shelfId);
      message.setScope('user');
      const payload = message.serializeBinary();
      this.rpc.request('User::collections', payload, (err, response, body) => {
        if (err !== null) {
          reject(err);
          return;
        }
        const responseMessage = messagesCollection.GetCollectionsResponse.deserializeBinary(
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
