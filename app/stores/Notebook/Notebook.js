class Notebook {
  transportLayer;
  notebooks = [];

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }

  create(title) {

  }

}

const notebookStore = new Notebook();

export default notebookStore;
