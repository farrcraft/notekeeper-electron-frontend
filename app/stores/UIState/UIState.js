import { observable, computed, asStructure } from 'mobx';

class UIState {
  @observable windowHeight = -1;
  @observable windowWidth = -1;

  transportLayer;

  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }

  load() {
    const promise = new Promise((resolve, reject) => {
      this.transportLayer.load().then((val) => {
        this.windowWidth = val.getWindowWidth();
        this.windowHeight = val.getWindowHeight();
        resolve(this);
      });
    });
    return promise;
  }

  save() {
    const promise = new Promise((resolve, reject) => {
      this.transportLayer.save().then(val) => {
        // [FIXME]
        resolve(this);
      });
    });
    return promise;
  }
}

const uiStore = new UIState();

export default uiStore;
