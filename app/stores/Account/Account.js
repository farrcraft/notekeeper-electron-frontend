import { action, extendObservable } from 'mobx';

class Account {

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
      this.handleGetState(val);
    });
    return promise;
  }

  handleGetState(val) {
    this.signedIn = val.signedIn;
    this.locked = val.locked;
    this.exists = val.exists;
  }

  @action create(accountName, email, passphrase) {
    const promise = this.transportLayer.create(accountName, email, passphrase);
    promise.then((val) => {
      this.handleCreate(val);
    });
  }

  handleCreate(val) {
    this.signedIn = true;
    this.exists = true;
    this.locked = false;
  }

  @action signin(accountName, email, passphrase, rememberMe) {
    const promise = this.transportLayer.signin(accountName, email, passphrase);
    promise.then((val) => {
      this.handleSignin(val);
    });
  }

  handleSignin(val) {
    this.signedIn = true;
    this.locked = false;
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

  unlock(passphrase) {
    const promise = this.transportLayer.unlock(passphrase);
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
