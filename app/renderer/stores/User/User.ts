import { observable } from 'mobx';
import Store from '../Store';

export default class User extends Store {
  @observable userId = null;

  @observable name: string = '';

  @observable email: string = '';

  /*
  constructor() {
    super();
  }
  */
}
