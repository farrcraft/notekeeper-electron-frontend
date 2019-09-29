import fs from 'fs';

import { Certificate as CertificateInterface } from '../../interfaces/core';
import InternalError from '../InternalError';

/**
 * Handle loading the backend SSL certificate
 * The certificate can only be loaded after the backend reaches its initial service
 * ready state.  Additionally, it can only be loaded from either the main or preload
 * processes.
 */
class Certificate implements CertificateInterface {
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
   * @param certPath
   */
  constructor(certPath: string) {
    this.path = certPath;
  }

  /**
   * Load the SSL certificate created by the backend process
   */
  load(): void {
    try {
      this.certificate = fs.readFileSync(this.path);
    } catch (err) {
      let msg = err.message;
      if (err.code === 'ENOENT') {
        msg = 'Certificate file does not exist';
      } else if (err.code === 'EACCESS') {
        msg = 'Certificate file permission denied';
      }
      throw new InternalError('Certificate Error', msg);
    }
  }
}

export default Certificate;
