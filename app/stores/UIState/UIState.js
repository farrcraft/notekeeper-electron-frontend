class UIState {
  windowHeight = -1;
  windowWidth = -1;
  windowXPosition = 0;
  windowYPosition = 0;
  windowMaximized = false;
  windowMinimized = false;
  windowFullscreen = false;
  displayHeight = -1;
  displayWidth = -1;
  displayXPosition = 0;
  displayYPosition = 0;

  transportLayer;

  setTransport(transport) {
    this.transportLayer = transport;
  }

  load() {
    const transport = this.transportLayer;
    const promise = new Promise((resolve, reject) => {
      transport.load().then((payload) => {
        this.windowWidth = payload.getWindowwidth();
        this.windowHeight = payload.getWindowheight();
        this.windowXPosition = payload.getWindowxposition();
        this.windowYPosition = payload.getWindowyposition();
        this.windowMaximized = payload.getWindowmaximized();
        this.windowMinimized = payload.getWindowmaximized();
        this.windowFullscreen = payload.getWindowfullscreen();
        this.displayHeight = payload.getDisplayheight();
        this.displayWidth = payload.getDisplaywidth();
        this.displayXPosition = payload.getDisplayxposition();
        this.displayYPosition = payload.getDisplayyposition();
        resolve();
        return true;
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
