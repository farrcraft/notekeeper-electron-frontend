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
    const responseMessage = messagesKex.KeyExchangeResponse.deserializeBinary(response);

    this.rpc.verifyPublicKey = responseMessage.getPublickey();
    this.rpc.clientToken = responseMessage.getToken();

    // responses would normally be verified directly by the rpc call, but it has to
    // be deferred in the case of key exchange - this throws on verification failure
    this.rpc.verifyLastResponse();
  }
}

export default Kex;
