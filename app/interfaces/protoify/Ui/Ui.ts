import { WindowState as WindowStateInterface } from '../../domain/Ui';
import {
  LoadUIStateResponse,
  SaveUIStateRequest
} from '../../../proto/ui_state_pb';

/**
 *
 */
interface Ui {
  /**
   *
   * @param windowState
   */
  toRequest(windowState: WindowStateInterface): SaveUIStateRequest;

  /**
   *
   */
  fromResponse(message: LoadUIStateResponse): WindowStateInterface;
}

export default Ui;
