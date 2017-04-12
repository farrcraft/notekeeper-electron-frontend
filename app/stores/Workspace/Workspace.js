import { extendObservable } from 'mobx';

/**
 * The workspace store keeps track of the current state of the workspace
 *
 * @class Workspace
 */
class Workspace {

  transportLayer;

  constructor() {
    extendObservable(this, {
      notebookTitleModalVisible: false
    });

    this.transportLayer = null;
  }


  setTransport(transportLayer) {
    this.transportLayer = transportLayer;
  }
}

const workspaceStore = new Workspace();

export default workspaceStore;
