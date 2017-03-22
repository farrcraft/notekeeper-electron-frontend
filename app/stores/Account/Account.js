import { observable } from 'mobx';

class Account {
  @observable signedIn = false;
  @observable locked = true;

  transportLayer = null;

  constructor() {
  }

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }

  getState() {
    console.log('store requesting state from ipc transport');
    const promise = this.transportLayer.getState();
    console.log('ready for then');
    promise.then((val) => {
      console.log('client got state - ', val);
    });
    console.log('did then');
  }

  create() {
    // [FIXME] - implement
  }

  signin() {
    // [FIXME] - implement
    this.signedIn = true;
  }

  signout() {
    // [FIXME] - implement
    this.signedIn = false;
  }

  lock() {
    // [FIXME] - implement
    this.locked = true;
  }

  unlock() {
    // [FIXME] - implement
    this.locked = false;
  }

  isLocked() {
    return (this.locked === true);
  }

  isSignedIn() {
    return (this.signedIn === true);
  }

  exists() {
    // [FIXME] - implement
  }
}

const accountStore = new Account();

export default accountStore;
