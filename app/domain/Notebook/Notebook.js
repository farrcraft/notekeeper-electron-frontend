import { observable } from 'mobx';

/**
 * A notebook
 * As defined by the backend protobuf definition
 */
export default class Notebook {
  /**
   * Internal UUID
   */
  id = null;

  /**
   * Title of the notebook
   */
  @observable name = '';

  /**
   * Is this a default notebook?
   */
  isDefault = false;

  /**
   * Is this notebook locked from editing?
   */
  @observable isLocked = false;

  /**
   * Timestamp of when the notebook was created
   */
  created = null;

  /**
   * Timestamp of when the notebook was last edited
   */
  updated = null;

  /**
   * The list of notes stored in this notebook
   */
  @observable notes = [];
}
