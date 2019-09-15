import Account from '../Account';
import Collection from '../Collection';
import Note from '../Note';
import Notebook from '../Notebook';
import Shelf from '../Shelf';
import Tag from '../Tag';
import Trash from '../Trash';
import UIState from '../UIState';
import User from '../User';
import Workspace from '../Workspace';

/**
 * Root store that is used for storing all of the other stores
 */
export default class Root {
  /**
   * The account store
   */
  account = null;

  /**
   * The collection store
   */
  collection = null;

  /**
   * The note store
   */
  note = null;

  /**
   * The notebook store
   */
  notebook = null;

  /**
   * The shelf store
   */
  shelf = null;

  /**
   * The tag store
   */
  tag = null;

  /**
   * The trash store
   */
  trash = null;

  /**
   * The uistate store
   */
  uiState = null;

  /**
   * The user store
   */
  user = null;

  /**
   * The workspace store
   */
  workspace = null;

  createStores(): void {
    this.account = new Account(this);
    this.collection = new Collection(this);
    this.note = new Note(this);
    this.notebook = new Notebook(this);
    this.shelf = new Shelf(this);
    this.tag = new Tag(this);
    this.trash = new Trash(this);
    this.uiState = new UIState(this);
    this.user = new User(this);
    this.workspace = new Workspace(this);
  }
}
