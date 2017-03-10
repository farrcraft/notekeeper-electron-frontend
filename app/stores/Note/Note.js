import singleton from 'singleton';

class Note extends singleton {
  transportLayer;

  constructor(transportLayer) {
    this.transportLayer = transportLayer;
  }
}

export default Note.get();
