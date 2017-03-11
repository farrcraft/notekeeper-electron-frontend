import singleton from 'singleton';

class Note extends singleton {
  transportLayer;

  constructor(transportLayer) {
    super();
    this.transportLayer = transportLayer;
  }
}

export default Note.get();
