import { action, observable } from 'mobx';
import Store from '../Store';

export default class Shelf extends Store {
  /**
   * List of shelves owned directly by the user
   */
  @observable userShelves = [];

  /**
   * List of shelves owned at the account level
   */
  @observable accountShelves = [];

  @action getUserShelves() {
    const promise = this.transportLayer.list('user');
    return promise.then(val => {
      const ok = this.handleCreate(val);
      return ok;
    });
  }
  /*
  @action userShelves() {
    const promise = this.transportLayer.create(accountName, email, passphrase);
    return promise.then(val => {
      const ok = this.handleCreate(val);
      return ok;
    });
  }

  handleCreate(val) {
    this.signedIn = true;
    this.exists = true;
    this.locked = false;
    this.viewOverride = null;
    return true;
  }
*/
}
