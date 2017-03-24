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

  @action create(accountName, email, passphrase) {
    const promise = this.transportLayer.create(accountName, email, passphrase);
    promise.then((val) => {
      this.signedIn = true;
      this.exists = true;
      this.locked = false;
    });
  }

  @action signin(accountName, email, passphrase) {
    const promise = this.transportLayer.signin(accountName, email, passphrase);
    promise.then((val) => {
      this.signedIn = true;
      this.locked = false;
    });
  }

  signout() {
    const promise = this.transportLayer.signout();
    promise.then((val) => {
      this.signedIn = false;
      this.locked = true;
    });
  }

  lock() {
    const promise = this.transportLayer.lock();
    promise.then((val) => {
      this.locked = true;
    });
  }

  unlock() {
    const promise = this.transportLayer.unlock();
    promise.then((val) => {
      this.locked = false;
    });
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
