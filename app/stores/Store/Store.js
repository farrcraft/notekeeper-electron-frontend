/**
 * A store that transports and stores domain objects
 */
export default class Store {
  /**
   * The transport
   */
  transportLayer = null;

  /**
   * A root store
   */
  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }

  setRootStore(rootStore) {
    this.rootStore = rootStore;
  }
}
