import { ipcMain } from 'electron';

export default class Handler {
  listener;

  store;

  constructor() {
    this.listener = ipcMain;
    this.store = null;
  }

  setStore(store) {
    this.store = store;
  }
}
