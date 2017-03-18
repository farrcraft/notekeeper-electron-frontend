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

  async getState() {
    await this.transportLayer.getState(this);
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
