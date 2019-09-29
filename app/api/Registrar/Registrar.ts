import {
  Api as ApiInterface,
  Registrar as RegistrarInterface
} from '../../interfaces/api';
import * as endpoints from '../endpoints';

/**
 *
 */
class Registrar implements RegistrarInterface {
  /**
   *
   * @param api
   */
  register(api: ApiInterface): void {
    api.registerProvider(new endpoints.Kex());
    api.registerProvider(new endpoints.Ui());
  }
}

export default Registrar;
