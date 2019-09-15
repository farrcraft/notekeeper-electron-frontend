import { action, observable } from 'mobx';
import Store from '../Store';
import {
  Account as AccountDomain,
  User as UserDomain
} from '../../../domain';

export default class Account extends Store {
  /**
   * Is the account signed in?
   */
  @observable signedIn: boolean = false;

  /**
   * Is the account locked?
   */
  @observable locked: boolean = true;

  /**
   * Does an account exist?
   */
  @observable exists: boolean = false;

  /**
   * A view to override any current view with
   */
  @observable viewOverride = null;

  /**
   * A user domain object
   */
  @observable user = null;

  /**
   * An account domain object
   */
  @observable account = null;

  get isSignedIn(): boolean {
    return this.signedIn;
  }

  get isLocked(): boolean {
    return this.locked;
  }

  @action getState() {
    const promise = this.transportLayer.getState();
    return promise.then((val): boolean => {
      const ok = this.handleGetState(val);
      return ok;
    });
  }

  handleGetState(val): boolean {
    this.signedIn = val.signedIn;
    this.locked = val.locked;
    this.exists = val.exists;
    return true;
  }

  @action overrideView(view): boolean {
    this.viewOverride = view;
    return true;
  }

  @action create(accountName: string, email: string, passphrase: string) {
    const promise = this.transportLayer.create(accountName, email, passphrase);
    return promise.then((val): boolean => {
      const ok = this.handleCreate(val);
      return ok;
    });
  }

  handleCreate(state): boolean {
    this.account = new AccountDomain(state.accountId);
    this.user = new UserDomain(state.userId);

    this.signedIn = true;
    this.exists = true;
    this.locked = false;
    this.viewOverride = null;
    return true;
  }

  @action signin(accountName: string, email: string, passphrase: string /* , rememberMe */) {
    const promise = this.transportLayer.signin(accountName, email, passphrase);
    return promise.then((val): boolean => {
      const ok = this.handleSignin(val);
      return ok;
    });
  }

  handleSignin(state): boolean {
    this.account = new AccountDomain(state.accountId);
    this.user = new UserDomain(state.userId);

    this.signedIn = true;
    this.locked = false;
    this.viewOverride = null;
    return true;
  }

  signout() {
    const promise = this.transportLayer.signout();
    return promise.then((/* val */): boolean => {
      this.account = null;
      this.user = null;
      this.signedIn = false;
      this.locked = true;
      this.viewOverride = null;
      return true;
    });
  }

  lock() {
    const promise = this.transportLayer.lock();
    return promise.then((/* val */): boolean => {
      this.locked = true;
      this.viewOverride = null;
      return this.locked;
    });
  }

  unlock(passphrase: string) {
    const promise = this.transportLayer.unlock(passphrase);
    return promise.then((/* val */): boolean => {
      this.locked = false;
      return this.locked;
    });
  }
}
