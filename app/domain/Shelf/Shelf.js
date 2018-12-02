import { observable } from 'mobx';

/**
 * A Shelf holds collections and individual notebooks
 * As defined by the shelf protobuf definition exposed by the backend
 */
export default class Shelf {
  /**
   * Internal UUID
   */
  id = null;

  /**
   * Name of the shelf
   */
  @observable name = '';

  /**
   * Is this the default shelf?
   */
  isDefault = false;

  /**
   * Is this the special trash shelf?
   */
  isTrash = false;

  /**
   * Is this shelf locked from editing?
   */
  @observable isLocked = false;

  /**
   * Timestamp of when the shelf was created
   */
  created = null;

  /**
   * Timestamp of when the shelf was last edited
   */
  updated = null;

  /**
   * The list of collections stored in this shelf
   */
  @observable collections = [];

  /**
   * The list of notebooks stored in this shelf
   */
  @observable notebooks = [];
}
