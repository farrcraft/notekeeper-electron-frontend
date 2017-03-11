import singleton from 'singleton';

class Notebook extends singleton {
  transportLayer;

  constructor(transportLayer) {
    super();
    this.transportLayer = transportLayer;
  }

}

export default Notebook.get();
