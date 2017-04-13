export default class Store {
  transportLayer

  constructor() {
    this.transportLayer = null;
  }

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }
}
