import Endpoint from '../../Endpoint';
import { Endpoint as EndpointInterface } from '../../../interfaces/api';
import { InternalError } from '../../../core';
import messagesKex from '../../../proto/kex_pb';

/**
 *
 */
class Kex extends Endpoint implements EndpointInterface {
  /**
   *
   */
  keyExchange(): void {
    if (this.rpc === null) {
      throw new InternalError('Service Error', 'RPC Unavailable');
    }
    const message = new messagesKex.KeyExchangeRequest();
    message.setPublickey(this.rpc.signPublicKey);
    const payload = message.serializeBinary();

    const response = this.rpc.request('KeyExchange', payload);
    response.then((body) => {
      if (this.rpc === null) {
        throw new InternalError('Service Error', 'RPC Unavailable');
      }
      const responseMessage = messagesKex.KeyExchangeResponse.deserializeBinary(this.rpc.str2ab(body));

      let key = responseMessage.getPublickey();
      if (typeof key === 'string') {
        // [FIXME] - need a better place for this method to live (it's in Request too)
        key = this.rpc.str2ab(key);
      }
      this.rpc.verifyPublicKey = key;
      this.rpc.clientToken = responseMessage.getToken();

      // responses would normally be verified directly by the rpc call, but it has to
      // be deferred in the case of key exchange - this throws on verification failure
      this.rpc.verifyLastResponse();
    });
  }
}

export default Kex;
