# RPC Design

Options:
* gRPC
* JSON-RPC
* REST
* GraphQL
* Cap'n Proto
* Custom Implementation


## gRPC

Implementation is easy, but client/server TLS is extremely complicated/limiting.


## JSON-RPC

TLS Could be challenging here again.  Don't see a lot of popular options on the 
nodejs side either.


## REST

Has the benefit of a standard HTTP server, so TLS is a known at least. Down side
is having to create a bunch of endpoints plus defining all of the resources.


## GraphQL

Down side here is complexity having to deal with all of the schema creation.


## Cap'n Proto

Sounds promising, but like gRPC & protobuf it is a native library that could just
end up being another big pain to deal with making work in electron.



## Custom Implementation

This is what I'm leaning toward.  Expose a single HTTPS server endpoint on a custom
port and define our own custom RPC dispatch system.

Use the request library on the client - https://github.com/request/request and 
https://github.com/request/request-promise-native


Use msgpack for encoding payload sent across the wire - http://msgpack.org/index.html

RPC Message structure would look something like:

```json
{
    "method": "Account::create",
    "payload": {
    }
}
```

The content of the payload parameter will be specific to the method being called.


# Legacy Implementation

The frontend talks to the backend (`notekeeper-electron-backend`) using gRPC.
The RPC communication only happens from the main/node process.  There are some
technical challenges in getting the `grpc` module to work in the renderer
process (where our React frontend lives).  Instead, backend requests made from
the React portion of the app must be proxied through an IPC layer.

Stores must interact with the `IPC` layer, but must never attempt to interact
with the `Transport` layer directly.

The API of `Store`, `IPC`, and `Transport` classes of the same type must all
mirror one another. I.e., for the Account type, if the store has a create
method in its API, there must be a create method in the corresponding ipc and
transport classes.

Stores must never be used in the main/node processes.  Instead, `Transport`
classes should always be worked with directly, bypassing the `Store` and `IPC`
layers.
