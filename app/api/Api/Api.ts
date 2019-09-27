import { Api as ApiInterface } from '../../interfaces/api/Api';
import { Endpoint as EndpointInterface } from '../../interfaces/api/Endpoint';
import { Rpc as RpcInterface } from '../../interfaces/rpc/Rpc';

/**
 *
 */
class Api implements ApiInterface {

  /**
   *
   */
  endpoints: { [name: string]: EndpointInterface };

  /**
   *
   */
  rpc: RpcInterface;

  /**
   *
   * @param rpc
   */
  constructor(rpc: RpcInterface) {
    this.rpc = rpc;
  }

  /**
   *
   * @param provider
   */
  registerProvider(provider: EndpointInterface) {
    this.endpoints[provider.name] = provider;
    provider.setRpc(rpc);
  }

  /**
   *
   * @param endpoint
   */
  getEndpoint(endpoint: string): EndpointInterface {
    return this.endpoints[endpoint];
  }
}

export default Api;
