import { observable, computed, asStructure } from 'mobx';

class UIState {
  @observable windowHeight = -1;
  @observable windowWidth = -1;

  transportLayer;

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }

  load() {
    this.transportLayer.load();
  }

  save() {
    this.transportLayer.save();
  }
}

const uiStore = new UIState();

export default uiStore;
