import { observable } from 'mobx';

/**
 * A Collection of notebooks
 */
export default class Collection {
  /**
   * Internal UUID
   */
  id: string = '';

  /**
   * Name of the collection
   */
  @observable name: string = '';

  /**
   * Is the collection locked?
   */
  @observable isLocked: boolean = false;

  /**
   * Internal UUID of the shelf this collection is stored in
   */
  @observable shelfId: string = '';

  /**
   * Timestamp of when the collection was created
   */
  created: number = -1;

  /**
   * Timestamp of when the collection was last updated
   */
  updated: number = -1;

  /**
   * List of notebooks stored in the collection
   */
  @observable notebooks = [];
}
