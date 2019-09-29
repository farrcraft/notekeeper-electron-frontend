/**
 *
 */
interface Certificate {
  /**
   *
   */
  certificate: Buffer|undefined;

  /**
   *
   */
  path: string;

  /**
   *
   */
  load(): void;
}

export default Certificate;
