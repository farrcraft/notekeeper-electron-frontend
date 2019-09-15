import {
  AccountRPC,
  NotebookRPC,
  NoteRPC,
  ShelfRPC,
  CollectionRPC,
  TagRPC,
  TrashRPC,
  UIStateRPC
} from './rpc';

// Attach the transports to the rpc instance
const bindTransports = rpc => {
  const accountTransport = new AccountRPC();
  rpc.registerTransport('account', accountTransport);

  const notebookTransport = new NotebookRPC(rpc);
  rpc.registerTransport('notebook', notebookTransport);

  const noteTransport = new NoteRPC(rpc);
  rpc.registerTransport('note', noteTransport);

  const shelfTransport = new ShelfRPC(rpc);
  rpc.registerTransport('shelf', shelfTransport);

  const collectionTransport = new CollectionRPC(rpc);
  rpc.registerTransport('collection', collectionTransport);

  const tagTransport = new TagRPC(rpc);
  rpc.registerTransport('tag', tagTransport);

  const trashTransport = new TrashRPC(rpc);
  rpc.registerTransport('trash', trashTransport);

  const uiStateTransport = new UIStateRPC(rpc);
  rpc.registerTransport('uiState', uiStateTransport);
};

export default bindTransports;
