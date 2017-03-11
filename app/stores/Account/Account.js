import singleton from 'singleton';
import { observable } from 'mobx';

class Account extends singleton {
  transportLayer;

  constructor(transportLayer) {
    super();
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

export default Account.get();
