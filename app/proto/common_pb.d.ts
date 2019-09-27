// package: notekeeper
// file: common.proto

import * as jspb from "google-protobuf";

export class RequestHeader extends jspb.Message {
  getMethod(): string;
  setMethod(value: string): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  getSequence(): number;
  setSequence(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestHeader.AsObject;
  static toObject(includeInstance: boolean, msg: RequestHeader): RequestHeader.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RequestHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestHeader;
  static deserializeBinaryFromReader(message: RequestHeader, reader: jspb.BinaryReader): RequestHeader;
}

export namespace RequestHeader {
  export type AsObject = {
    method: string,
    signature: Uint8Array | string,
    sequence: number,
  }
}

export class ResponseHeader extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): void;

  getCode(): number;
  setCode(value: number): void;

  getScope(): number;
  setScope(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResponseHeader.AsObject;
  static toObject(includeInstance: boolean, msg: ResponseHeader): ResponseHeader.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResponseHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResponseHeader;
  static deserializeBinaryFromReader(message: ResponseHeader, reader: jspb.BinaryReader): ResponseHeader;
}

export namespace ResponseHeader {
  export type AsObject = {
    status: string,
    code: number,
    scope: number,
  }
}

