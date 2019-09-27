import Endpoint from '../Endpoint';
import { Endpoint as EndpointInterface } from '../../interfaces/api';
import messagesKex from '../../proto/kex_pb';

class Kex extends Endpoint implements Endpoint {
  keyExchange(): boolean {
    const message = new messagesKex.KeyExchangeRequest();
    message.setPublickey(this.rpc.signPublicKey);
    const payload = message.serializeBinary();
    response = this.rpc.request('KeyExchange', payload);
    if (status !== 'OK') {
      return false;
    }
    this.rpc.verifyPublicKey = responseMessage.getPublickey();
    this.rpc.clientToken = responseMessage.getToken();

    // responses would normally be verified directly by the rpc call, but it has to
    // be deferred in the case of key exchange
    if (!this.rpc.verifyLastResponse()) {
      return false;
    }

    return true;
  }
}

export default Kex;
