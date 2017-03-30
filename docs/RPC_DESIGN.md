# RPC Design

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
