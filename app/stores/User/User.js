import { observable } from 'mobx';
import Store from '../Store';

export default class User extends Store {
  @observable userId = null;

  @observable name = '';

  @observable email = '';

  /*
  constructor() {
    super();
  }
  */
}
