// package: notekeeper
// file: rpc.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class EmptyRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyRequest;
  static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
  }
}

export class EmptyResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyResponse): EmptyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmptyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyResponse;
  static deserializeBinaryFromReader(message: EmptyResponse, reader: jspb.BinaryReader): EmptyResponse;
}

export namespace EmptyResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
  }
}

export class IdRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IdRequest): IdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IdRequest;
  static deserializeBinaryFromReader(message: IdRequest, reader: jspb.BinaryReader): IdRequest;
}

export namespace IdRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
  }
}

export class IdResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IdResponse): IdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IdResponse;
  static deserializeBinaryFromReader(message: IdResponse, reader: jspb.BinaryReader): IdResponse;
}

export namespace IdResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    id: string,
  }
}

