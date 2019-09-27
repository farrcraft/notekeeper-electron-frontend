// package: notekeeper
// file: kex.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class KeyExchangeRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getPublickey(): Uint8Array | string;
  getPublickey_asU8(): Uint8Array;
  getPublickey_asB64(): string;
  setPublickey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyExchangeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: KeyExchangeRequest): KeyExchangeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: KeyExchangeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyExchangeRequest;
  static deserializeBinaryFromReader(message: KeyExchangeRequest, reader: jspb.BinaryReader): KeyExchangeRequest;
}

export namespace KeyExchangeRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    publickey: Uint8Array | string,
  }
}

export class KeyExchangeResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  getPublickey(): Uint8Array | string;
  getPublickey_asU8(): Uint8Array;
  getPublickey_asB64(): string;
  setPublickey(value: Uint8Array | string): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyExchangeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: KeyExchangeResponse): KeyExchangeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: KeyExchangeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyExchangeResponse;
  static deserializeBinaryFromReader(message: KeyExchangeResponse, reader: jspb.BinaryReader): KeyExchangeResponse;
}

export namespace KeyExchangeResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    publickey: Uint8Array | string,
    token: string,
  }
}

