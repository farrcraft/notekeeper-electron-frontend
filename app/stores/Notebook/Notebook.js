import singleton from 'singleton';

class Notebook extends singleton {
  transportLayer;

  constructor(transportLayer) {
    this.transportLayer = transportLayer;
  }

}

export default Notebook.get();
