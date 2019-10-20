import { Ui as UiInterface } from '../../../interfaces/api/endpoints';
import { WindowState as WindowStateInterface } from '../../../interfaces/domain/Ui';
import Endpoint from '../../Endpoint';
import { Endpoint as EndpointInterface } from '../../../interfaces/api';
import messagesRpc from '../../../proto/rpc_pb';
import commonProto from '../../../proto/common_pb';
import UiProto from '../../../proto/ui_state_pb';
import { default as UiProtoify } from '../../../protoify/Ui';
import { InternalError } from '../../../core';

/**
 *
 */
class Ui extends Endpoint implements EndpointInterface, UiInterface {
  /**
   *
   */
  protoify: UiProtoify;

  /**
   *
   */
  constructor() {
    super();
    this.protoify = new UiProtoify();
  }

  /**
   *
   */
  loadWindowState(): WindowStateInterface {
    const message = new messagesRpc.EmptyRequest();
    const messageHeader = new commonProto.RequestHeader();
    messageHeader.setMethod('UIState::load');
    message.setHeader(messageHeader);
    const payload = message.serializeBinary();
    if (this.rpc === null) {
      throw new InternalError('Service Error', 'RPC Unavailable');
    }
    const response = this.rpc.request('UIState::load', payload);
    response.then((body) => {
      if (this.rpc === null) {
        throw new InternalError('Service Error', 'RPC Unavailable');
      }
      const responseMessage = UiProto.LoadUIStateResponse.deserializeBinary(this.rpc.str2ab(body));
    });
    const state = this.protoify.fromResponse(responseMessage);
    return state;
  }

  /**
   *
   * @param state
   */
  saveWindowState(state: WindowStateInterface) {
    const message = this.protoify.toRequest(state);
    const payload = message.serializeBinary();
  }
}

export default Ui;
