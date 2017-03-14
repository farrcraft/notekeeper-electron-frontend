// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var app_proto_backend_pb = require('../../app/proto/backend_pb.js');

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

function serialize_notekeeper_CreateNotebookRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.CreateNotebookRequest)) {
    throw new Error('Expected argument of type notekeeper.CreateNotebookRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_CreateNotebookRequest(buffer_arg) {
  return app_proto_backend_pb.CreateNotebookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_IdRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.IdRequest)) {
    throw new Error('Expected argument of type notekeeper.IdRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_IdRequest(buffer_arg) {
  return app_proto_backend_pb.IdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_IdResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.IdResponse)) {
    throw new Error('Expected argument of type notekeeper.IdResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_IdResponse(buffer_arg) {
  return app_proto_backend_pb.IdResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_notekeeper_SaveUIStateRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.SaveUIStateRequest)) {
    throw new Error('Expected argument of type notekeeper.SaveUIStateRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_SaveUIStateRequest(buffer_arg) {
  return app_proto_backend_pb.SaveUIStateRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_notekeeper_StatusResponse(arg) {
  if (!(arg instanceof app_proto_backend_pb.StatusResponse)) {
    throw new Error('Expected argument of type notekeeper.StatusResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_StatusResponse(buffer_arg) {
  return app_proto_backend_pb.StatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notekeeper_TokenRequest(arg) {
  if (!(arg instanceof app_proto_backend_pb.TokenRequest)) {
    throw new Error('Expected argument of type notekeeper.TokenRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_notekeeper_TokenRequest(buffer_arg) {
  return app_proto_backend_pb.TokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
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


// N.B. - In the go bindings, case of the generated methods matches these proto definitions
// However, in the JS bindings, method names start lowercase (so it's, e.g. "openMasterDb" instead of "OpenMasterDb")
// If you try to invoke the latter, the client will just hang indefinitely.
var BackendService = exports.BackendService = {
  openMasterDb: {
    path: '/notekeeper.Backend/OpenMasterDb',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.OpenMasterDbRequest,
    responseType: app_proto_backend_pb.StatusResponse,
    requestSerialize: serialize_notekeeper_OpenMasterDbRequest,
    requestDeserialize: deserialize_notekeeper_OpenMasterDbRequest,
    responseSerialize: serialize_notekeeper_StatusResponse,
    responseDeserialize: deserialize_notekeeper_StatusResponse,
  },
  createAccount: {
    path: '/notekeeper.Backend/CreateAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.CreateAccountRequest,
    responseType: app_proto_backend_pb.IdResponse,
    requestSerialize: serialize_notekeeper_CreateAccountRequest,
    requestDeserialize: deserialize_notekeeper_CreateAccountRequest,
    responseSerialize: serialize_notekeeper_IdResponse,
    responseDeserialize: deserialize_notekeeper_IdResponse,
  },
  unlockAccount: {
    path: '/notekeeper.Backend/UnlockAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.UnlockAccountRequest,
    responseType: app_proto_backend_pb.StatusResponse,
    requestSerialize: serialize_notekeeper_UnlockAccountRequest,
    requestDeserialize: deserialize_notekeeper_UnlockAccountRequest,
    responseSerialize: serialize_notekeeper_StatusResponse,
    responseDeserialize: deserialize_notekeeper_StatusResponse,
  },
  signinAccount: {
    path: '/notekeeper.Backend/SigninAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.SigninAccountRequest,
    responseType: app_proto_backend_pb.IdResponse,
    requestSerialize: serialize_notekeeper_SigninAccountRequest,
    requestDeserialize: deserialize_notekeeper_SigninAccountRequest,
    responseSerialize: serialize_notekeeper_IdResponse,
    responseDeserialize: deserialize_notekeeper_IdResponse,
  },
  signoutAccount: {
    path: '/notekeeper.Backend/SignoutAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.IdRequest,
    responseType: app_proto_backend_pb.StatusResponse,
    requestSerialize: serialize_notekeeper_IdRequest,
    requestDeserialize: deserialize_notekeeper_IdRequest,
    responseSerialize: serialize_notekeeper_StatusResponse,
    responseDeserialize: deserialize_notekeeper_StatusResponse,
  },
  lockAccount: {
    path: '/notekeeper.Backend/LockAccount',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.IdRequest,
    responseType: app_proto_backend_pb.StatusResponse,
    requestSerialize: serialize_notekeeper_IdRequest,
    requestDeserialize: deserialize_notekeeper_IdRequest,
    responseSerialize: serialize_notekeeper_StatusResponse,
    responseDeserialize: deserialize_notekeeper_StatusResponse,
  },
  uIState: {
    path: '/notekeeper.Backend/UIState',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.TokenRequest,
    responseType: app_proto_backend_pb.UIStateResponse,
    requestSerialize: serialize_notekeeper_TokenRequest,
    requestDeserialize: deserialize_notekeeper_TokenRequest,
    responseSerialize: serialize_notekeeper_UIStateResponse,
    responseDeserialize: deserialize_notekeeper_UIStateResponse,
  },
  saveUIState: {
    path: '/notekeeper.Backend/SaveUIState',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.SaveUIStateRequest,
    responseType: app_proto_backend_pb.StatusResponse,
    requestSerialize: serialize_notekeeper_SaveUIStateRequest,
    requestDeserialize: deserialize_notekeeper_SaveUIStateRequest,
    responseSerialize: serialize_notekeeper_StatusResponse,
    responseDeserialize: deserialize_notekeeper_StatusResponse,
  },
  accountState: {
    path: '/notekeeper.Backend/AccountState',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.TokenRequest,
    responseType: app_proto_backend_pb.AccountStateResponse,
    requestSerialize: serialize_notekeeper_TokenRequest,
    requestDeserialize: deserialize_notekeeper_TokenRequest,
    responseSerialize: serialize_notekeeper_AccountStateResponse,
    responseDeserialize: deserialize_notekeeper_AccountStateResponse,
  },
  createNotebook: {
    path: '/notekeeper.Backend/CreateNotebook',
    requestStream: false,
    responseStream: false,
    requestType: app_proto_backend_pb.CreateNotebookRequest,
    responseType: app_proto_backend_pb.IdResponse,
    requestSerialize: serialize_notekeeper_CreateNotebookRequest,
    requestDeserialize: deserialize_notekeeper_CreateNotebookRequest,
    responseSerialize: serialize_notekeeper_IdResponse,
    responseDeserialize: deserialize_notekeeper_IdResponse,
  },
};

exports.BackendClient = grpc.makeGenericClientConstructor(BackendService);
