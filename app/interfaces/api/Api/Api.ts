import Endpoint from '../Endpoint';

/**
 *
 */
interface Api {
  /**
   *
   * @param provider
   */
  registerProvider(provider) : void;

  /**
   *
   * @param endpoint
   */
  getEndpoint(endpoint: string) : Endpoint;
}

export default Api;
