import { Rpc as RpcInterface } from '../../rpc/Rpc';

/**
 *
 */
interface Endpoint {
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
  setRpc(rpc: RpcInterface): void;
}

export default Endpoint;
