import { observable } from 'mobx';

class Account {
  @observable signedIn = false;
  @observable locked = true;
  @observable exists = false;

  transportLayer = null;

  constructor() {
  }

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }

  getState() {
    const promise = this.transportLayer.getState();
    promise.then((val) => {
      this.signedIn = val.signedIn;
      this.locked = val.locked;
      this.exists = val.exists;
    });
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
