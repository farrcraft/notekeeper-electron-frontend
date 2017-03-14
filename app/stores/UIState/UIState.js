import { observable, computed, asStructure } from 'mobx';

class UIState {
  @observable windowHeight = -1;
  @observable windowWidth = -1;

  transportLayer;

  setTransport(transport) {
    console.log('setting transport');
    console.log(transport);
    this.transportLayer = transport;
  }

  load() {
    console.log('loading from transport');
    const transport = this.transportLayer;
    const promise = new Promise((resolve, reject) => {
      console.log('calling transport layer');
      console.log(transport);
      console.log(transport.load);
      transport.load().then((val) => {
        console.log('and then transport loaded val ', val);
        this.windowWidth = val.getWindowWidth();
        this.windowHeight = val.getWindowHeight();
        resolve();
      });
    });
    return promise;
  }

  save() {
    const promise = new Promise((resolve, reject) => {
      this.transportLayer.save().then((val) => {
        // [FIXME]
        resolve(this);
      });
    });
    return promise;
  }
}

const uiStore = new UIState();

export default uiStore;
