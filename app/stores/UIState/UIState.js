import { observable, computed, asStructure } from 'mobx';
import singleton from 'singleton';

class UIState extends singleton {
  constructor() {

  }
}

export default UIState.get();
