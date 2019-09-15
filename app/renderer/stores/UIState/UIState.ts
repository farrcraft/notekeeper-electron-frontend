import Store from '../Store';

export default class UIState extends Store {
  windowHeight: number = -1;

  windowWidth: number = -1;

  windowXPosition: number = 0;

  windowYPosition: number = 0;

  windowMaximized: boolean = false;

  windowMinimized: boolean = false;

  windowFullscreen: boolean = false;

  displayHeight: number = -1;

  displayWidth: number = -1;

  displayXPosition: number = 0;

  displayYPosition: number = 0;

  load(): Promise {
    const transport = this.transportLayer;
    const promise = new Promise((resolve /* , reject */): void => {
      transport
        .load()
        .then((payload): boolean => {
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
        })
        .catch(err => {
          console.log(err);
        });
    });
    return promise;
  }

  save(): Promise {
    const promise = this.transportLayer.save(this);
    return promise;
  }
}
