# NoteKeeper.io Electron Frontend

## Build Dependencies

* Node v7.4.0

The electron-rebuild tool has a dependency on python.  Even though there is a
python environment in babun, a standard Windows install is still necessary.
Stick with a 2.7.x version.

* https://www.python.org/downloads/windows/


## Setup

```sh
# Install node dependencies
npm install
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
