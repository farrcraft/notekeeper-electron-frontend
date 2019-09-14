import {
  AccountIPC,
  NotebookIPC,
  NoteIPC,
  ShelfIPC,
  CollectionIPC
} from './ipc';

// Attach the transports to their stores
const bindTransports = stores => {
  const accountTransport = new AccountIPC();
  stores.account.setTransport(accountTransport);

  const notebookTransport = new NotebookIPC();
  stores.notebook.setTransport(notebookTransport);

  const noteTransport = new NoteIPC();
  stores.note.setTransport(noteTransport);

  const shelfTransport = new ShelfIPC();
  stores.shelf.setTransport(shelfTransport);

  const collectionTransport = new CollectionIPC();
  stores.collection.setTransport(collectionTransport);
};

export default bindTransports;
