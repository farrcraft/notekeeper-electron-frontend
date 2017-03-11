import rpc from '../Rpc';
import messages from '../../proto/backend_pb';

/*
rpc CreateAccount(CreateAccountRequest) returns (CreateAccountResponse) {}
rpc UnlockAccount(UnlockAccountRequest) returns (UnlockAccountResponse) {}
rpc SigninAccount(SigninAccountRequest) returns (SigninAccountResponse) {}
rpc SignoutAccount(SignoutAccountRequest) returns(SignoutAccountResponse) {}
rpc LockAccount(LockAccountRequest) returns (LockAccountResponse) {}
*/
export default class Account {
  static create() {
    const request = new messages.CreateAccountRequest();
    // request.setPath(userDataPath);
    const client = rpc.getClient();
    client.CreateAccount(request, (err, response) => {
      const status = response.getStatus();
      if (status !== 'OK') {
      }
    });
  }

  static signin() {

  }

  static signout() {

  }

  static unlock() {

  }

  static lock() {

  }
}
