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
      transport.load().then((val) => {
        this.windowWidth = val.getWindowwidth();
        this.windowHeight = val.getWindowheight();
        this.windowXPosition = val.getWindowxposition();
        this.windowYPosition = val.getWindowyposition();
        this.windowMaximized = val.getWindowmaximized();
        this.windowMinimized = val.getWindowmaximized();
        this.windowFullscreen = val.getWindowfullscreen();
        this.displayHeight = val.getDisplayheight();
        this.displayWidth = val.getDisplaywidth();
        this.displayXPosition = val.getDisplayxposition();
        this.displayYPosition = val.getDisplayyposition();
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
