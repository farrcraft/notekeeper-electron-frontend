# RPC Design

Communication between client & server is done over standard HTTP+TLS.  
The Client uses the request library for talking to the server:
https://github.com/request/request

Messages are sent over the wire as protobuf encoded data.

Requests include an HTTP header with the signature of the message.
The signature is base64 encoded.
The header is named 'NoteKeeper-Request-Signature'.

Requests include an HTTP header with the rpc method of the message.
The header is named 'NoteKeeper-Request-Method'.

The Server sends headers with the signature & sequence of the response.

The Client in this case is the main Electron process.
It is an intermediary between the server and the Electron renderer process.

There are 3 separate module types in the RPC system:

- RPC transports (`app/transports/rpc/*`)
- IPC transports (`app/transports/ipc/*`)
- Stores (`app/stores/*`)

The actual RPC communication only happens from the main/node process.
These calls are handled by the `transports/rpc/Rpc/Rpc.js` module.

The renderer process (where the React frontend lives) does not directly invoke the RPC calls.
Instead, it makes calls to the IPC transports. The IPC transports dispatch messages which are
listened for by the RPC transports. The RPC transports make the actual RPC call to the backend
and then send a response message back to the IPC transport that dispatched the original message.

The stores connect between the Mobx system and the IPC transports in the renderer process.
Stores are used to hold the data returned via the IPC/RPC pipeline. The data managed by the
stores is what is actually used by the React application.

Stores must interact with the `IPC` layer, but must never attempt to interact
with the `Transport` layer directly.

The API of `Store`, `IPC`, and `Transport` classes of the same type must all
mirror one another. I.e., for the Account type, if the store has a create
method in its API, there must be a create method in the corresponding ipc and
transport classes.

Stores must never be used in the main/node processes. Instead, `Transport`
classes should always be worked with directly, bypassing the `Store` and `IPC`
layers.

!!![FIXME]!!! - What role to the `app/domain/*` modules play?

# Legacy Implementation v2

Use the request library on the client - https://github.com/request/request

RPC Message structure looks like:

```json
{
  "method": "Account::create",
  "sequence": 1,
  "signature": "DHSEUIDS)(X()_-3;lSD",
  "payload": {}
}
```

The content of the payload parameter will be specific to the method being called.

# Legacy Implementation

The frontend talks to the backend (`notekeeper-electron-backend`) using gRPC.
The RPC communication only happens from the main/node process. There are some
technical challenges in getting the `grpc` module to work in the renderer
process (where our React frontend lives). Instead, backend requests made from
the React portion of the app must be proxied through an IPC layer.
