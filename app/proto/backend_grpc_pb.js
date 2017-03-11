// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var app_proto_backend_pb = require('../../app/proto/backend_pb.js');

function serialize_notekeeper_AccountStateRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.AccountStateRequest)) {
    throw new Error('Expected argument of type notekeeper.AccountStateRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_AccountStateRequest(buffer_arg) {
  return app_proto_backend_pb.AccountStateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_AccountStateResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.AccountStateResponse)) {
    throw new Error('Expected argument of type notekeeper.AccountStateResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_AccountStateResponse(buffer_arg) {
  return app_proto_backend_pb.AccountStateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_CreateAccountRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.CreateAccountRequest)) {
    throw new Error('Expected argument of type notekeeper.CreateAccountRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_CreateAccountRequest(buffer_arg) {
  return app_proto_backend_pb.CreateAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_CreateAccountResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.CreateAccountResponse)) {
    throw new Error('Expected argument of type notekeeper.CreateAccountResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_CreateAccountResponse(buffer_arg) {
  return app_proto_backend_pb.CreateAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_CreateNotebookRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.CreateNotebookRequest)) {
    throw new Error('Expected argument of type notekeeper.CreateNotebookRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_CreateNotebookRequest(buffer_arg) {
  return app_proto_backend_pb.CreateNotebookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_CreateNotebookResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.CreateNotebookResponse)) {
    throw new Error('Expected argument of type notekeeper.CreateNotebookResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_CreateNotebookResponse(buffer_arg) {
  return app_proto_backend_pb.CreateNotebookResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_LockAccountRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.LockAccountRequest)) {
    throw new Error('Expected argument of type notekeeper.LockAccountRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_LockAccountRequest(buffer_arg) {
  return app_proto_backend_pb.LockAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_LockAccountResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.LockAccountResponse)) {
    throw new Error('Expected argument of type notekeeper.LockAccountResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_LockAccountResponse(buffer_arg) {
  return app_proto_backend_pb.LockAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_OpenMasterDbRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.OpenMasterDbRequest)) {
    throw new Error('Expected argument of type notekeeper.OpenMasterDbRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_OpenMasterDbRequest(buffer_arg) {
  return app_proto_backend_pb.OpenMasterDbRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_OpenMasterDbResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.OpenMasterDbResponse)) {
    throw new Error('Expected argument of type notekeeper.OpenMasterDbResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_OpenMasterDbResponse(buffer_arg) {
  return app_proto_backend_pb.OpenMasterDbResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_SaveUIStateRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.SaveUIStateRequest)) {
    throw new Error('Expected argument of type notekeeper.SaveUIStateRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_SaveUIStateRequest(buffer_arg) {
  return app_proto_backend_pb.SaveUIStateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_SaveUIStateResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.SaveUIStateResponse)) {
    throw new Error('Expected argument of type notekeeper.SaveUIStateResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_SaveUIStateResponse(buffer_arg) {
  return app_proto_backend_pb.SaveUIStateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_SigninAccountRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.SigninAccountRequest)) {
    throw new Error('Expected argument of type notekeeper.SigninAccountRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_SigninAccountRequest(buffer_arg) {
  return app_proto_backend_pb.SigninAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_SigninAccountResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.SigninAccountResponse)) {
    throw new Error('Expected argument of type notekeeper.SigninAccountResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_SigninAccountResponse(buffer_arg) {
  return app_proto_backend_pb.SigninAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_SignoutAccountRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.SignoutAccountRequest)) {
    throw new Error('Expected argument of type notekeeper.SignoutAccountRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_SignoutAccountRequest(buffer_arg) {
  return app_proto_backend_pb.SignoutAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_SignoutAccountResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.SignoutAccountResponse)) {
    throw new Error('Expected argument of type notekeeper.SignoutAccountResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_SignoutAccountResponse(buffer_arg) {
  return app_proto_backend_pb.SignoutAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_UIStateRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.UIStateRequest)) {
    throw new Error('Expected argument of type notekeeper.UIStateRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_UIStateRequest(buffer_arg) {
  return app_proto_backend_pb.UIStateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_UIStateResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.UIStateResponse)) {
    throw new Error('Expected argument of type notekeeper.UIStateResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_UIStateResponse(buffer_arg) {
  return app_proto_backend_pb.UIStateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_UnlockAccountRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.UnlockAccountRequest)) {
    throw new Error('Expected argument of type notekeeper.UnlockAccountRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_UnlockAccountRequest(buffer_arg) {
  return app_proto_backend_pb.UnlockAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_UnlockAccountResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.UnlockAccountResponse)) {
    throw new Error('Expected argument of type notekeeper.UnlockAccountResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_UnlockAccountResponse(buffer_arg) {
  return app_proto_backend_pb.UnlockAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BackendService = exports.BackendService = {
  openMasterDb: {
    path: '/notekeeper.Backend/OpenMasterDb',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.OpenMasterDbRequest,
    responseType: app_proto_backend_pb.OpenMasterDbResponse,
    requestSerialize: serialize_notekeeper_OpenMasterDbRequest,
    requestDeserialize: deserialize_notekeeper_OpenMasterDbRequest,
    responseSerialize: serialize_notekeeper_OpenMasterDbResponse,
    responseDeserialize: deserialize_notekeeper_OpenMasterDbResponse,
  },
  createAccount: {
    path: '/notekeeper.Backend/CreateAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.CreateAccountRequest,
    responseType: app_proto_backend_pb.CreateAccountResponse,
    requestSerialize: serialize_notekeeper_CreateAccountRequest,
    requestDeserialize: deserialize_notekeeper_CreateAccountRequest,
    responseSerialize: serialize_notekeeper_CreateAccountResponse,
    responseDeserialize: deserialize_notekeeper_CreateAccountResponse,
  },
  unlockAccount: {
    path: '/notekeeper.Backend/UnlockAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.UnlockAccountRequest,
    responseType: app_proto_backend_pb.UnlockAccountResponse,
    requestSerialize: serialize_notekeeper_UnlockAccountRequest,
    requestDeserialize: deserialize_notekeeper_UnlockAccountRequest,
    responseSerialize: serialize_notekeeper_UnlockAccountResponse,
    responseDeserialize: deserialize_notekeeper_UnlockAccountResponse,
  },
  signinAccount: {
    path: '/notekeeper.Backend/SigninAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.SigninAccountRequest,
    responseType: app_proto_backend_pb.SigninAccountResponse,
    requestSerialize: serialize_notekeeper_SigninAccountRequest,
    requestDeserialize: deserialize_notekeeper_SigninAccountRequest,
    responseSerialize: serialize_notekeeper_SigninAccountResponse,
    responseDeserialize: deserialize_notekeeper_SigninAccountResponse,
  },
  signoutAccount: {
    path: '/notekeeper.Backend/SignoutAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.SignoutAccountRequest,
    responseType: app_proto_backend_pb.SignoutAccountResponse,
    requestSerialize: serialize_notekeeper_SignoutAccountRequest,
    requestDeserialize: deserialize_notekeeper_SignoutAccountRequest,
    responseSerialize: serialize_notekeeper_SignoutAccountResponse,
    responseDeserialize: deserialize_notekeeper_SignoutAccountResponse,
  },
  lockAccount: {
    path: '/notekeeper.Backend/LockAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.LockAccountRequest,
    responseType: app_proto_backend_pb.LockAccountResponse,
    requestSerialize: serialize_notekeeper_LockAccountRequest,
    requestDeserialize: deserialize_notekeeper_LockAccountRequest,
    responseSerialize: serialize_notekeeper_LockAccountResponse,
    responseDeserialize: deserialize_notekeeper_LockAccountResponse,
  },
  uIState: {
    path: '/notekeeper.Backend/UIState',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.UIStateRequest,
    responseType: app_proto_backend_pb.UIStateResponse,
    requestSerialize: serialize_notekeeper_UIStateRequest,
    requestDeserialize: deserialize_notekeeper_UIStateRequest,
    responseSerialize: serialize_notekeeper_UIStateResponse,
    responseDeserialize: deserialize_notekeeper_UIStateResponse,
  },
  saveUIState: {
    path: '/notekeeper.Backend/SaveUIState',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.SaveUIStateRequest,
    responseType: app_proto_backend_pb.SaveUIStateResponse,
    requestSerialize: serialize_notekeeper_SaveUIStateRequest,
    requestDeserialize: deserialize_notekeeper_SaveUIStateRequest,
    responseSerialize: serialize_notekeeper_SaveUIStateResponse,
    responseDeserialize: deserialize_notekeeper_SaveUIStateResponse,
  },
  accountState: {
    path: '/notekeeper.Backend/AccountState',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.AccountStateRequest,
    responseType: app_proto_backend_pb.AccountStateResponse,
    requestSerialize: serialize_notekeeper_AccountStateRequest,
    requestDeserialize: deserialize_notekeeper_AccountStateRequest,
    responseSerialize: serialize_notekeeper_AccountStateResponse,
    responseDeserialize: deserialize_notekeeper_AccountStateResponse,
  },
  createNotebook: {
    path: '/notekeeper.Backend/CreateNotebook',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.CreateNotebookRequest,
    responseType: app_proto_backend_pb.CreateNotebookResponse,
    requestSerialize: serialize_notekeeper_CreateNotebookRequest,
    requestDeserialize: deserialize_notekeeper_CreateNotebookRequest,
    responseSerialize: serialize_notekeeper_CreateNotebookResponse,
    responseDeserialize: deserialize_notekeeper_CreateNotebookResponse,
  },
};

exports.BackendClient = grpc.makeGenericClientConstructor(BackendService);
