/**
 *
 */
interface Ui {
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
