// package: notekeeper
// file: db.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class OpenMasterDbRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OpenMasterDbRequest.AsObject;
  static toObject(includeInstance: boolean, msg: OpenMasterDbRequest): OpenMasterDbRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OpenMasterDbRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OpenMasterDbRequest;
  static deserializeBinaryFromReader(message: OpenMasterDbRequest, reader: jspb.BinaryReader): OpenMasterDbRequest;
}

export namespace OpenMasterDbRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    path: string,
  }
}

