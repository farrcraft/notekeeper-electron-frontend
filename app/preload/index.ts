import Bridge from './Bridge';
import { Bridge as BridgeInterface } from '../interfaces/preload/Bridge';

// We need to expand the global window type to be able to add our bridge object later
declare global {
  interface Window { Bridge: BridgeInterface }
}

function init(): void {
  // Expose a bridging API by setting a global on `window`.
  // We'll add methods to it here first, and when the remote web app loads,
  // it'll add some additional methods as well.
  //
  // !!!!CAREFUL!!!! do not expose any functionality or APIs that could compromise the
  // user's computer. E.g. don't directly expose core Electron (even IPC) or node.js modules.
  window.Bridge = new Bridge();
}

init();
