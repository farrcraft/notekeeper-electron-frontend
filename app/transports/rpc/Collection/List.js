import Handler from '../Handler';
import rpc from '../Rpc';
import messagesCollection from '../../../proto/collection_pb';

export default class List extends Handler {
  constructor() {
    super();
    this.registerIpc();
  }

  // registerIpc registers IPC hooks mirroring the RPC calls
  registerIpc() {
    this.listener.on('Account::collections', event => {
      const promise = getAccountCollections();
      promise
        .then(val => {
          event.sender.send('Account::collections', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });

    this.listener.on('User::collections', event => {
      const promise = getUserCollections();
      promise
        .then(val => {
          event.sender.send('User::collections', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });
  }
}

function checkResponseStatus(message, reject) {
  const header = message.getHeader();
  const status = header.getStatus();
  if (status !== 'OK') {
    reject(status);
    return false;
  }
  return true;
}

function getAccountCollections(shelfId) {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesCollection.GetCollectionsRequest();
    message.setShelfid(shelfId);
    message.setScope('account');
    const payload = message.serializeBinary();
    rpc.request('Account::collections', payload, (err, response, body) => {
      if (err !== null) {
        reject(err);
        return;
      }
      const responseMessage = messagesCollection.GetCollectionsResponse.deserializeBinary(
        body
      );
      const ok = checkResponseStatus(responseMessage, reject);
      if (ok) {
        resolve(ok);
      }
    });
  });
  return promise;
}

function getUserCollections(shelfId) {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesCollection.GetCollectionsRequest();
    message.setShelfid(shelfId);
    message.setScope('user');
    const payload = message.serializeBinary();
    rpc.request('User::collections', payload, (err, response, body) => {
      if (err !== null) {
        reject(err);
        return;
      }
      const responseMessage = messagesCollection.GetCollectionsResponse.deserializeBinary(
        body
      );
      const ok = checkResponseStatus(responseMessage, reject);
      if (ok) {
        resolve(ok);
      }
    });
  });
  return promise;
}
