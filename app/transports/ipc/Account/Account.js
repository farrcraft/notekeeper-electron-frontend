import { ipcRenderer } from 'electron';

export default class Account {
  getState() {
    // [FIXME] - use real token
    const token = 'secure token';
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Account::getState', (event, arg) => {
        resolve(arg);
      });
      ipcRenderer.send('Account::getState', token);
    });
    return promise;
  }
}
