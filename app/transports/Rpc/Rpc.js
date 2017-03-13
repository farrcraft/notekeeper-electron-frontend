import grpc from 'grpc';
import services from '../../proto/backend_grpc_pb';

const RPC_PORT = 'localhost:53017';

class Rpc {
  client

  getClient() {
    if (!this.client) {
      // [FIXME] - need to use proper grpc TLS credentials here
      this.client = new services.BackendClient(RPC_PORT, grpc.credentials.createInsecure());
    }
    return this.client;
  }
}

const rpcTransport = new Rpc();

export default rpcTransport;
