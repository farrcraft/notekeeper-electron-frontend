import {
  AccountRPC,
  NotebookRPC,
  NoteRPC,
  ShelfRPC,
  CollectionRPC,
  TagRPC,
  TrashRPC,
  UIStateRPC,
} from './rpc';
import Rpc from './rpc/Rpc';

// Attach the transports to the rpc instance
const bindTransports = (rpc: Rpc): void => {
  const accountTransport = new AccountRPC();
  rpc.registerTransport('account', accountTransport);

  const notebookTransport = new NotebookRPC();
  rpc.registerTransport('notebook', notebookTransport);

  const noteTransport = new NoteRPC();
  rpc.registerTransport('note', noteTransport);

  const shelfTransport = new ShelfRPC();
  rpc.registerTransport('shelf', shelfTransport);

  const collectionTransport = new CollectionRPC();
  rpc.registerTransport('collection', collectionTransport);

  const tagTransport = new TagRPC();
  rpc.registerTransport('tag', tagTransport);

  const trashTransport = new TrashRPC();
  rpc.registerTransport('trash', trashTransport);

  const uiStateTransport = new UIStateRPC();
  rpc.registerTransport('uiState', uiStateTransport);
};

export default bindTransports;
