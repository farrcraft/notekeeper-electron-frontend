import childProcess from 'child_process';

import Logger from '../shared/Logger';

/**
 * Backend server
 */
export default class Backend {
  /**
   * The backend server process
   */
  process: childProcess.ChildProcess = null;

  async create(rpcMain): Promise {
    const promise = new Promise((resolve, reject) => {
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
    this.process.kill();
  }
}
