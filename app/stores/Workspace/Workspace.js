import { extendObservable } from 'mobx';
import Store from '../Store';

/**
 * The workspace store keeps track of the current state of the workspace
 *
 * @class Workspace
 */
class Workspace extends Store {
  constructor() {
    super();
    extendObservable(this, {
      notebookTitleModalVisible: false
    });
  }
}

const workspaceStore = new Workspace();

export default workspaceStore;
