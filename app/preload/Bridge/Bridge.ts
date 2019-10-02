// in preload scripts, we have access to node.js and electron APIs
// the remote web app will not have access, so this is safe
import {
  ipcRenderer,
  IpcRenderer,
  remote
} from 'electron';
import path from 'path';

import {
  Bridge as BridgeInterface,
  Env,
  UserData
} from '../../interfaces/preload/Bridge';
import Certificate from '../../core/Certificate';

/**
 * The preload bridge attaches to the render process' window object
 */
class Bridge implements BridgeInterface {
  /**
   * Properties from the node process environment
   */
  env: Env;

  /**
   * The IPC entry point for the renderer to communicate with the main process
   */
  ipc: IpcRenderer;

  /**
   * Properties from the electron user data
   */
  userData: UserData;

  /**
   * The SSL certificate created by the backend process
   */
  certificate: Buffer|undefined;

  /**
   * Initialize the preload bridge
   */
  constructor() {
    this.userData = {
      path: remote.app.getPath('userData')
    };

    this.ipc = ipcRenderer;

    this.env = {
      port: process.env.PORT,
      nodeEnv: process.env.NODE_ENV
    };

    // We need the backend's SSL cert & verification key to be able to make backend API calls
    const certPath = path.join(this.userData.path, 'certificate');
    const cert = new Certificate(certPath);
    try {
      cert.load();
    } catch (err) {
      // [FIXME] - fatal error
    }
    this.certificate = cert.certificate;
  }
}

export default Bridge;
