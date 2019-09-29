import { Endpoint as EndpointInterface } from '../../interfaces/api';
import { Rpc as RpcInterface } from '../../interfaces/rpc';

/**
 *
 */
class Endpoint implements EndpointInterface {
  /**
   *
   */
  name: string;

  /**
   *
   */
  rpc: RpcInterface|null;

  constructor() {
    this.name = '';
    this.rpc = null;
  }

  /**
   *
   * @param rpc
   */
  setRpc(rpc: RpcInterface): void {
    this.rpc = rpc;
  }
}

export default Endpoint;
