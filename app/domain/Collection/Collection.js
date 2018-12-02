import { observable } from 'mobx';

/**
 * A Collection of notebooks
 */
export default class Collection {
  /**
   * Internal UUID
   */
  id = null;

  /**
   * Name of the collection
   */
  @observable name = '';

  /**
   * Is the collection locked?
   */
  @observable isLocked = false;

  /**
   * Internal UUID of the shelf this collection is stored in
   */
  @observable shelfId = null;

  /**
   * Timestamp of when the collection was created
   */
  created = null;

  /**
   * Timestamp of when the collection was last updated
   */
  updated = null;

  /**
   * List of notebooks stored in the collection
   */
  @observable notebooks = [];
}
