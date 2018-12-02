# Code Organization

## React

All React components live in the `app/components` directory.

Component directories are further broken down:

- views - partial sections that are used for composing screens
- screens - entire top-level screens (pages) that are displayed in the app
- ui - generic ui stuff like inputs/toolbars/buttons/checkboxes

These directories can be further broken down by feature or type:

- screens/Account/Signin/
- views/Workspace/Note

## RPC System

- `app/transports/ipc` - Communication transport between the React renderer process & the main Node electron process
- `app/transports/rpc` - Communication between the main Node electron process and the backend go service
- `app/stores` - MobX connection point to the IPC transport layer
- `app/domain` - ???
