import { observable } from 'mobx';

/**
 * A note
 * As defined by the backend protobuf definition
 */
export default class Note {
  /**
   * Internal UUID
   */
  id = null;

  /**
   * Internal UUID of the notebook that this note belongs to
   */
  @observable notebookId = null;

  /**
   * Title of the note
   */
  @observable name = '';

  /**
   * Is the note locked from editing?
   */
  @observable isLocked = false;

  /**
   * Timestamp of when the note was created
   */
  created = null;

  /**
   * Timestamp of when the note was last updated
   */
  updated = null;
}
