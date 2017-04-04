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
        const payload = val.payload;
        this.windowWidth = payload.window_width;
        this.windowHeight = payload.window_height;
        this.windowXPosition = payload.window_x_position;
        this.windowYPosition = payload.window_y_position;
        this.windowMaximized = payload.window_maximized;
        this.windowMinimized = payload.window_maximized;
        this.windowFullscreen = payload.window_fullscreen;
        this.displayHeight = payload.display_height;
        this.displayWidth = payload.display_width;
        this.displayXPosition = payload.display_x_position;
        this.displayYPosition = payload.display_y_position;
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
