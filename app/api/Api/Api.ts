import {
  Api as ApiInterface,
  Endpoint as EndpointInterface,
  EndpointHashMap,
} from '../../interfaces/api';
import { Rpc as RpcInterface } from '../../interfaces/rpc';

/**
 *
 */
class Api implements ApiInterface {

  /**
   *
   */
  endpoints: EndpointHashMap;

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
    this.endpoints = {};
  }

  /**
   *
   * @param provider
   */
  registerProvider(provider: EndpointInterface): void {
    this.endpoints[provider.name] = provider;
    provider.setRpc(this.rpc);
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
