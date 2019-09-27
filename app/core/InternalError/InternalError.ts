class InternalError extends Error {
  constructor(title: string, msg: string) {
    super(msg);
    this.name = title;
  }
}

export default InternalError;
