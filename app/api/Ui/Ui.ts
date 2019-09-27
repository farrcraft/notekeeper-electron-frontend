import { Ui as UiInterface } from '../../interfaces/api';

/**
 *
 */
class Ui implements UiInterface {
  /**
   *
   */
  loadWindowState(): WindowState {
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
  saveWindowState(state: WindowState) {
    message = this.protoify.toRequest(state);
    const payload = message.serializeBinary();
  }
}

export default Ui;
