import childProcess from 'child_process';

import Logger from '../shared/Logger';
import Rpc from './rpc/Rpc';

/**
 * Backend server
 */
export default class Backend {
  /**
   * The backend server process
   */
  process: childProcess.ChildProcess | null = null;

  async create(rpcMain: Rpc): Promise<any> {
    const promise = new Promise((resolve, reject): void => {
      this.process = childProcess.spawn('./app/resources/backend');
      this.process.stdout.on('data', data => {
        const out = data.toString();
        if (out === 'NOTEKEEPER_SERVICE_READY\n') {
          rpcMain.waitForReady(10, () => {
            resolve(out);
          });
        } else {
          Logger.debug(out);
          reject(out);
        }
      });
      this.process.stderr.on('data', data => {
        Logger.debug(data.toString());
      });
      this.process.on('exit', code => {
        if (code !== 0 && code !== null) {
          Logger.debug(`Child exited with code ${code}`);
        }
      });
    });
    return promise;
  }

  /**
   * Terminate the backend server process
   */
  destroy(): void {
    if (this.process) {
      this.process.kill();
    }
  }
}
