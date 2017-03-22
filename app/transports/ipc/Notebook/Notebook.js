import { ipcRenderer } from 'electron';

export default class Notebook {
  create(name) {
    const promise = new Promise((resolve, reject) => {
      ipcRenderer.on('Notebook::create', (event, arg) => {
        resolve(arg);
      });
      ipcRenderer.send('Notebook::create', name);
    });
    return promise;
  }
}
