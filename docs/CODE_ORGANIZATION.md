# Code Organization

There are 3 separate app entry points:

- `main` - This is the main electron process and is responsible for creating the app's main browser window 
- `preload` - Provides a bridge between node engine capabilities/modules and the renderer process
- `renderer` - The portion of the application exposed in the browser window aka the electron renderer process

Importantly, for security the renderer process does not have access to node or any of its native modules.
It's roughly equivalent to running in a normal browser.  Hence the need for the preload script to act as a
bridge between the two worlds.

## React

All React components live in the `app/renderer/components` directory.

Component directories are further broken down:

- views - partial sections that are used for composing screens
- screens - entire top-level screens (pages) that are displayed in the app
- ui - generic ui stuff like inputs/toolbars/buttons/checkboxes

These directories can be further broken down by feature or type:

- screens/Account/Signin/
- views/Workspace/Note

## RPC System

- `app/transports/ipc` - Communication transport between the React renderer process & the main Node electron process
  - runs in the renderer process
- `app/transports/rpc` - Communication between the main Node electron process and the backend go service
  - runs in the main process
- `app/stores` - MobX connection point to the IPC transport layer
  - only accessed by the renderer; uses `app/domain` objects
- `app/domain` - Domain objects
