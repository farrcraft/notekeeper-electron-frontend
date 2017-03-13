import { observable } from 'mobx';

class Account {
  transportLayer;

  constructor() {
  }

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }

  create() {

  }

  signin() {

  }

  signout() {

  }

  lock() {

  }

  isLocked() {

  }

  isSignedIn() {

  }

  exists() {

  }
}

const accountStore = new Account();

export default accountStore;
// export { Account };
