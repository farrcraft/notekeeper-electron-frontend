import { observable, action, extendObservable } from 'mobx';

class Account {
  /*
  @observable signedIn
  @observable locked
  @observable exists
  */

  transportLayer

  constructor() {
    extendObservable(this, {
      signedIn: false,
      locked: true,
      exists: false
    });
    this.transportLayer = null;
  }

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }

  get isSignedIn() {
    return this.signedIn;
  }

  get isLocked() {
    return this.locked;
  }

  @action getState() {
    const promise = this.transportLayer.getState();
    promise.then((val) => {
      this.signedIn = val.signedIn;
      this.locked = val.locked;
      this.exists = val.exists;
    });
    return promise;
  }

  @action create(accountName, email, password) {
    const promise = this.transportLayer.create(accountName, email, password);
    promise.then((val) => {
      this.signedIn = true;
      this.exists = true;
      this.locked = false;
    });
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
