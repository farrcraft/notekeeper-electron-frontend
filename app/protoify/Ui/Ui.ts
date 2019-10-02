import { Ui as UiInterface } from '../../interfaces/protoify';
import { WindowState as WindowStateInterface } from '../../interfaces/domain/Ui';
import { WindowState } from '../../domain/Ui';
import {
  LoadUIStateResponse,
  SaveUIStateRequest
} from '../../proto/ui_state_pb';

/**
 *
 */
class Ui implements UiInterface {
  /**
   *
   * @param windowState
   */
  toRequest(windowState: WindowStateInterface): SaveUIStateRequest {
    const message = new SaveUIStateRequest();
    message.setWindowwidth(windowState.windowBounds.width);
    message.setWindowheight(windowState.windowBounds.height);
    message.setWindowxposition(windowState.windowBounds.x);
    message.setWindowyposition(windowState.windowBounds.y);
    message.setWindowmaximized(windowState.maximized);
    message.setWindowminimized(windowState.minimized);
    message.setWindowfullscreen(windowState.fullscreen);
    message.setDisplayheight(windowState.displayBounds.height);
    message.setDisplaywidth(windowState.displayBounds.width);
    message.setDisplayxposition(windowState.displayBounds.x);
    message.setDisplayyposition(windowState.displayBounds.y);
    return message;
  }

  /**
   *
   * @param message
   */
  fromResponse(message: LoadUIStateResponse): WindowStateInterface {
    const windowState = new WindowState();
    windowState.displayBounds.height = message.getDisplayheight();
    windowState.displayBounds.width = message.getDisplaywidth();
    windowState.displayBounds.x = message.getDisplayxposition();
    windowState.displayBounds.y = message.getDisplayyposition();
    windowState.windowBounds.height = message.getWindowheight();
    windowState.windowBounds.width = message.getWindowwidth();
    windowState.windowBounds.x = message.getWindowxposition();
    windowState.windowBounds.y = message.getWindowyposition();
    windowState.fullscreen = message.getWindowfullscreen();
    windowState.maximized = message.getWindowmaximized();
    windowState.minimized = message.getWindowminimized();
    return windowState;
  }
}

export default Ui;
