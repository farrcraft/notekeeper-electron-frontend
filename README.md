# NoteKeeper.io Electron Frontend

## Build Dependencies

* Node v6.10.0

The electron-rebuild tool has a dependency on python.  Even though there is a
python environment in babun, a standard Windows install is still necessary.
Stick with a 2.7.x version.

* https://www.python.org/downloads/windows/


## Setup

```sh
# Install node dependencies
npm install
# build grpc for electron
./install_grpc.sh
```

## Building

```sh
# this does a normal build
npm run build
```

## Testing

```sh
# Run ES linter
npm run lint
```

## Running

```sh
# This starts a dev hot reload server & launches the electron app:
npm run dev

# If you want to see gRPC debugging, run this instead:
GRPC_TRACE=all GRPC_VERBOSITY=DEBUG npm run dev
```


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
