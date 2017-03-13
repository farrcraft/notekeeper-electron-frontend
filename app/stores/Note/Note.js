class Note {
  transportLayer;

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }
}

const noteStore = new Note();

export default noteStore;
