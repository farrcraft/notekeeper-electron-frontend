import { /* action, */ extendObservable } from 'mobx';
import Store from '../Store';

export default class Notebook extends Store {
  constructor() {
    super();

    extendObservable(this, {
      notebooks: []
    });
  }
/*
  @action create(title): Promise {
    const promise = this.transportLayer.create(title);
    return promise.then(val => {
      const ok = this.handleCreate(val);
      return ok;
    });
  }

  // WIP - can't use this rule quite yet
  handleCreate(val): boolean {
    return true;
  }

  @action list(): void {}
*/
}
