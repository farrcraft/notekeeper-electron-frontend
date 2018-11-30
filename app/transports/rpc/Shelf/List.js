import Handler from '../Handler';
import rpc from '../Rpc';
import messagesShelf from '../../../proto/shelf_pb';

export default class List extends Handler {
  constructor() {
    super();
    this.registerIpc();
  }

  // registerIpc registers IPC hooks mirroring the RPC calls
  registerIpc() {
    this.listener.on('Account::shelves', event => {
      const promise = getAccountShelves();
      promise
        .then(val => {
          event.sender.send('Account::shelves', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });

    this.listener.on('User::shelves', event => {
      const promise = getUserShelves();
      promise
        .then(val => {
          event.sender.send('User::shelves', val);
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

function getAccountShelves(accountId) {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesShelf.GetShelvesRequest();
    message.setId(accountId);
    message.setScope('account');
    const payload = message.serializeBinary();
    rpc.request('Account::shelves', payload, (err, response, body) => {
      if (err !== null) {
        reject(err);
        return;
      }
      const responseMessage = messagesShelf.GetShelvesResponse.deserializeBinary(
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

function getUserShelves(userId) {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesShelf.GetShelvesRequest();
    message.setId(userId);
    message.setScope('user');
    const payload = message.serializeBinary();
    rpc.request('User::shelves', payload, (err, response, body) => {
      if (err !== null) {
        reject(err);
        return;
      }
      const responseMessage = messagesShelf.GetShelvesResponse.deserializeBinary(
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
