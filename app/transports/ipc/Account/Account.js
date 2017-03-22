//import { default as ipc } from '../Ipc';
import { ipcRenderer } from 'electron';

export default class Account {
  getState() {
    // [FIXME] - use real token
    const token = 'secure token';
    const promise = new Promise((resolve, reject) => {
      console.log('binding renderer handler');
      ipcRenderer.on('Account::getState', (event, arg) => {
        console.log('got main reply - resolving');
        resolve(arg);
      });
      console.log('sending renderer ipc call');
      ipcRenderer.send('Account::getState', token);
    });
    return promise;
  }
}
