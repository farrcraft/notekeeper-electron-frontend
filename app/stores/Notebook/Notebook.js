class Notebook {
  transportLayer;

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }

}

const notebookStore = new Notebook();

export default notebookStore;
