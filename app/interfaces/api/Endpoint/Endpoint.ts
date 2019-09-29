import { Rpc } from '../../rpc';

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
  rpc: Rpc|null;

  /**
   *
   * @param rpc
   */
  setRpc(rpc: Rpc): void;
}

export default Endpoint;
