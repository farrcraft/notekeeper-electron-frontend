import { action, extendObservable } from 'mobx';
import Store from '../Store';

class Account extends Store {
  constructor() {
    super();

    extendObservable(this, {
      signedIn: false,
      locked: true,
      exists: false
    });
  }

  get isSignedIn() {
    return this.signedIn;
  }

  get isLocked() {
    return this.locked;
  }

  @action getState() {
    const promise = this.transportLayer.getState();
    return promise.then((val) => {
      const ok = this.handleGetState(val);
      return ok;
    });
  }

  handleGetState(val) {
    this.signedIn = val.signedIn;
    this.locked = val.locked;
    this.exists = val.exists;
    return true;
  }

  @action create(accountName, email, passphrase) {
    const promise = this.transportLayer.create(accountName, email, passphrase);
    return promise.then((val) => {
      const ok = this.handleCreate(val);
      return ok;
    });
  }

  handleCreate(val) {
    this.signedIn = true;
    this.exists = true;
    this.locked = false;
    return true;
  }

  @action signin(accountName, email, passphrase, rememberMe) {
    const promise = this.transportLayer.signin(accountName, email, passphrase);
    return promise.then((val) => {
      const ok = this.handleSignin(val);
      return ok;
    });
  }

  handleSignin(val) {
    this.signedIn = true;
    this.locked = false;
    return true;
  }

  signout() {
    const promise = this.transportLayer.signout();
    return promise.then((val) => {
      this.signedIn = false;
      this.locked = true;
      return true;
    });
  }

  lock() {
    const promise = this.transportLayer.lock();
    return promise.then((val) => {
      this.locked = true;
      return this.locked;
    });
  }

  unlock(passphrase) {
    const promise = this.transportLayer.unlock(passphrase);
    return promise.then((val) => {
      this.locked = false;
      return this.locked;
    });
  }
}

const accountStore = new Account();

export default accountStore;
