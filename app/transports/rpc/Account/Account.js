import Handler from '../Handler';
import rpc from '../Rpc';
import messagesRpc from '../../../proto/rpc_pb';
import messagesAccount from '../../../proto/account_pb';

export default class Account extends Handler {
  constructor() {
    super();
    this.registerIpc();
  }

  // registerIpc registers IPC hooks mirroring the RPC calls
  registerIpc() {
    this.listener.on('Account::create', (event, arg) => {
      const promise = createAccount(arg.accountName, arg.email, arg.passphrase);
      promise
        .then(val => {
          this.store.handleCreate(val);
          event.sender.send('Account::create', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });

    this.listener.on('Account::getState', event => {
      const promise = getAccountState();
      promise
        .then(val => {
          this.store.handleGetState(val);
          event.sender.send('Account::getState', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });

    this.listener.on('Account::signin', (event, arg) => {
      const promise = signinAccount(arg.accountName, arg.email, arg.passphrase);
      promise
        .then(val => {
          this.store.handleSignin(val);
          event.sender.send('Account::signin', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });

    this.listener.on('Account::signout', event => {
      const promise = signoutAccount();
      promise
        .then(val => {
          event.sender.send('Account::signout', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });

    this.listener.on('Account::unlock', (event, arg) => {
      const promise = unlockAccount(arg.passphrase);
      promise
        .then(val => {
          event.sender.send('Account::unlock', val);
          return val;
        })
        .catch(err => {
          rpc.handleError(err);
        });
    });

    this.listener.on('Account::lock', event => {
      const promise = lockAccount();
      promise
        .then(val => {
          event.sender.send('Account::lock', val);
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

// createAccount makes an RPC request to create a new account
function createAccount(name, email, passphrase) {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesAccount.CreateAccountRequest();
    message.setEmail(email);
    message.setName(name);
    message.setPassphrase(passphrase);
    const payload = message.serializeBinary();
    rpc.request('Account::create', payload, (err, response, body) => {
      if (err !== null) {
        reject(err);
        return;
      }
      const responseMessage = messagesRpc.IdResponse.deserializeBinary(body);
      const ok = checkResponseStatus(responseMessage, reject);
      if (ok) {
        resolve(ok);
      }
    });
  });
  return promise;
}

// getAccountState makes an RPC request to get the current account state
function getAccountState() {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesRpc.EmptyRequest();
    const messageHeader = new messagesRpc.RequestHeader();
    // messageHeader.setMethod('UIState::load');
    messageHeader.setMethod('AccountState::get');
    message.setHeader(messageHeader);
    const payload = message.serializeBinary();
    rpc.request('AccountState::get', payload, (err, response, body) => {
      if (err !== null) {
        reject(err);
        return;
      }
      const responseMessage = messagesAccount.AccountStateResponse.deserializeBinary(
        body
      );
      const ok = checkResponseStatus(responseMessage, reject);
      if (!ok) {
        return;
      }
      const state = {};
      state.signedIn = responseMessage.getSignedin();
      state.locked = responseMessage.getLocked();
      state.exists = responseMessage.getExists();
      resolve(state);
    });
  });
  return promise;
}

// signinAccount makes an RPC request to sign in to an account
function signinAccount(name, email, passphrase) {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesAccount.SigninAccountRequest();
    message.setName(name);
    message.setEmail(email);
    message.setPassphrase(passphrase);
    const payload = message.serializeBinary();
    rpc.request('Account::signin', payload, (err, response, body) => {
      if (err) {
        reject(err);
        return;
      }
      const responseMessage = messagesRpc.EmptyResponse.deserializeBinary(body);
      const ok = checkResponseStatus(responseMessage, reject);
      if (ok) {
        resolve(ok);
      }
    });
  });
  return promise;
}

// signoutAccount makes an RPC request to sign out from a signed in account
function signoutAccount() {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesRpc.EmptyRequest();
    const messageHeader = new messagesRpc.RequestHeader();
    messageHeader.setMethod('Account::signout');
    message.setHeader(messageHeader);
    const payload = message.serializeBinary();
    rpc.request('Account::signout', payload, (err, response, body) => {
      if (err) {
        reject(err);
        return;
      }
      const responseMessage = messagesRpc.EmptyResponse.deserializeBinary(body);
      const ok = checkResponseStatus(responseMessage, reject);
      if (ok) {
        resolve(ok);
      }
    });
  });
  return promise;
}

// unlockAccount makes an RPC request to unlock a locked account
function unlockAccount(passphrase) {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesAccount.UnlockAccountRequest();
    message.setPassphrase(passphrase);
    const payload = message.serializeBinary();
    rpc.request('Account::unlock', payload, (err, response, body) => {
      if (err) {
        reject(err);
        return;
      }
      const responseMessage = messagesRpc.EmptyResponse.deserializeBinary(body);
      const ok = checkResponseStatus(responseMessage, reject);
      if (ok) {
        resolve(ok);
      }
    });
  });
  return promise;
}

// lockAccount makes an RPC request to lock an unlocked account
function lockAccount() {
  const promise = new Promise((resolve, reject) => {
    const message = new messagesRpc.EmptyRequest();
    const messageHeader = new messagesRpc.RequestHeader();
    messageHeader.setMethod('Account::lock');
    message.setHeader(messageHeader);
    const payload = message.serializeBinary();
    rpc.request('Account::lock', payload, (err, response, body) => {
      if (err) {
        reject(err);
        return;
      }
      const responseMessage = messagesRpc.EmptyResponse.deserializeBinary(body);
      const ok = checkResponseStatus(responseMessage, reject);
      if (ok) {
        resolve(ok);
      }
    });
  });
  return promise;
}
