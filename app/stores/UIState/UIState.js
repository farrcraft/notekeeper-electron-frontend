import { observable, computed, asStructure } from 'mobx';
import singleton from 'singleton';

class UIState extends singleton {
  constructor() {
    super();
  }
}

export default UIState.get();
