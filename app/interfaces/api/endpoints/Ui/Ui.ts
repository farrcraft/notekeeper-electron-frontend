import { WindowState } from '../../../domain/Ui';
import { default as UiProtoify } from '../../../protoify/Ui';
/**
 *
 */
interface Ui {
  protoify: UiProtoify;

  /**
   *
   */
  loadWindowState(): WindowState;

  /**
   *
   * @param state
   */
  saveWindowState(state: WindowState): void;
}

export default Ui;
