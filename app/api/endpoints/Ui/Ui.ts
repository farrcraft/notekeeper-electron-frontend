import { Ui as UiInterface } from '../../../interfaces/api/endpoints';
import { WindowState as WindowStateInterface } from '../../../interfaces/domain/UI';
import Endpoint from '../../Endpoint';
import { Endpoint as EndpointInterface } from '../../../interfaces/api';

/**
 *
 */
class Ui extends Endpoint implements EndpointInterface, UiInterface {
  /**
   *
   */
  loadWindowState(): WindowStateInterface {
    const message = new messagesRpc.EmptyRequest();
    const messageHeader = new messagesRpc.RequestHeader();
    messageHeader.setMethod('UIState::load');
    message.setHeader(messageHeader);
    const payload = message.serializeBinary();

  }

  /**
   *
   * @param state
   */
  saveWindowState(state: WindowStateInterface) {
    message = this.protoify.toRequest(state);
    const payload = message.serializeBinary();
  }
}

export default Ui;
