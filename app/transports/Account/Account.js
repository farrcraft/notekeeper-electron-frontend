import grpc from 'grpc';
import messages from '../../proto/backend_pb';

/*
	rpc CreateAccount(CreateAccountRequest) returns (CreateAccountResponse) {}
	rpc UnlockAccount(UnlockAccountRequest) returns (UnlockAccountResponse) {}
	rpc SigninAccount(SigninAccountRequest) returns (SigninAccountResponse) {}
	rpc SignoutAccount(SignoutAccountRequest) returns(SignoutAccountResponse) {}
	rpc LockAccount(LockAccountRequest) returns (LockAccountResponse) {}
*/
export default class Account {
  create() {
    var request = new messages.CreateAccountRequest();
    //request.setPath(userDataPath);
    var client = rpc.getClient();
    client.CreateAccount(request, function(err, response) {
      const status = response.getStatus();
      if (status != 'OK') {
      }
    });
  }

  signin() {
      
  }

  signout() {

  }

  unlock() {

  }

  lock() {

  }
}
