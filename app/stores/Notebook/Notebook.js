import { action, extendObservable } from 'mobx';
import Store from '../Store';

class Notebook extends Store {
  constructor() {
    super();

    extendObservable(this, {
      notebooks: []
    });
  }

  @action create(title) {
    const promise = this.transportLayer.create(title);
    return promise.then((val) => {
      const ok = this.handleCreate(val);
      return ok;
    });
  }

  handleCreate(val) {
    /*
    this.signedIn = true;
    this.exists = true;
    this.locked = false;
    */
    return true;
  }

  @action list() {

  }

}

const notebookStore = new Notebook();

export default notebookStore;
