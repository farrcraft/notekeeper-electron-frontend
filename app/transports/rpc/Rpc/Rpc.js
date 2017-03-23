import grpc from 'grpc';
import services from '../../../proto/backend_grpc_pb';
import { default as AccountTransport } from '../Account';
import { default as NotebookTransport } from '../Notebook';
import { default as NoteTransport } from '../Note';
import { default as TagTransport } from '../Tag';
import { default as TrashTransport } from '../Trash';

const RPC_PORT = 'localhost:53017';

class Rpc {
  client
  transports = {};

  // registerTransports instantiates all of the available RPC transport classes
  registerTransports() {
    this.transports['account'] = new AccountTransport();
    this.transports['notebook'] = new NotebookTransport();
    this.transports['note'] = new NoteTransport();
    this.transports['tag'] = new TagTransport();
    this.transports['trash'] = new TrashTransport();
  }

  getClient() {
    if (!this.client) {
      // [FIXME] - need to use proper grpc TLS credentials here
      this.client = new services.BackendClient(RPC_PORT, grpc.credentials.createInsecure());
    }
    return this.client;
  }

  close() {
    if (this.client) {
      grpc.closeClient(this.client);
      this.client = null;
    }
  }
}

const rpcTransport = new Rpc();

export default rpcTransport;
