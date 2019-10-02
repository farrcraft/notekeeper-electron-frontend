import Endpoint from '../Endpoint';
import { Rpc } from '../../rpc';
import EndpointHashMap from './EndpointHashMap';

/**
 *
 */
interface Api {
  /**
   *
   */
  endpoints: EndpointHashMap|undefined;

  /**
   *
   */
  rpc: Rpc;

  /**
   *
   * @param provider
   */
  registerProvider(provider: Endpoint): void;

  /**
   *
   * @param endpoint
   */
  getEndpoint(endpoint: string): Endpoint;
}

export default Api;
