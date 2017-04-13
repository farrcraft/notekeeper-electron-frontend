import Store from '../Store';

class Notebook extends Store {
  notebooks = [];

  constructor() {
    super();
  }

  create(title) {

  }

}

const notebookStore = new Notebook();

export default notebookStore;
