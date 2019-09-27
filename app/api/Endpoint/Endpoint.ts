import { Endpoint as EndpointInterface } from '../../interfaces/api';
import { Rpc as RpcInterface } from '../../interfaces/rpc/Rpc';

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
  rpc: RpcInterface;

  /**
   *
   * @param rpc
   */
  setRpc(rpc: RpcInterface): void {
    this.rpc = rpc;
  }
}

export default Endpoint;
