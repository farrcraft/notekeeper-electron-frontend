import { observable, computed, asStructure } from 'mobx';

class UIState {
  @observable windowHeight = -1;
  @observable windowWidth = -1;

  transportLayer;

  setTransport(transport) {
    this.transportLayer = transport;
  }

  load() {
    const transport = this.transportLayer;
    const promise = new Promise((resolve, reject) => {
      transport.load().then((val) => {
        this.windowWidth = val.getWindowwidth();
        this.windowHeight = val.getWindowheight();
        resolve();
      });
    });
    return promise;
  }

  save() {
    const promise = this.transportLayer.save(this);
    return promise;
  }
}

const uiStore = new UIState();

export default uiStore;
