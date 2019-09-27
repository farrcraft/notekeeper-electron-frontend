// package: notekeeper
// file: shelf.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as title_pb from "./title_pb";

export class Shelf extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getScope(): string;
  setScope(value: string): void;

  getDefault(): boolean;
  setDefault(value: boolean): void;

  getTrash(): boolean;
  setTrash(value: boolean): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  getCreated(): string;
  setCreated(value: string): void;

  getUpdated(): string;
  setUpdated(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Shelf.AsObject;
  static toObject(includeInstance: boolean, msg: Shelf): Shelf.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Shelf, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Shelf;
  static deserializeBinaryFromReader(message: Shelf, reader: jspb.BinaryReader): Shelf;
}

export namespace Shelf {
  export type AsObject = {
    id: string,
    name?: title_pb.Title.AsObject,
    scope: string,
    pb_default: boolean,
    trash: boolean,
    locked: boolean,
    created: string,
    updated: string,
  }
}

export class GetShelvesRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetShelvesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetShelvesRequest): GetShelvesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetShelvesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetShelvesRequest;
  static deserializeBinaryFromReader(message: GetShelvesRequest, reader: jspb.BinaryReader): GetShelvesRequest;
}

export namespace GetShelvesRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    scope: string,
  }
}

export class GetShelvesResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  clearShelvesList(): void;
  getShelvesList(): Array<Shelf>;
  setShelvesList(value: Array<Shelf>): void;
  addShelves(value?: Shelf, index?: number): Shelf;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetShelvesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetShelvesResponse): GetShelvesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetShelvesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetShelvesResponse;
  static deserializeBinaryFromReader(message: GetShelvesResponse, reader: jspb.BinaryReader): GetShelvesResponse;
}

export namespace GetShelvesResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    shelvesList: Array<Shelf.AsObject>,
  }
}

export class CreateShelfRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getId(): string;
  setId(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateShelfRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateShelfRequest): CreateShelfRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateShelfRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateShelfRequest;
  static deserializeBinaryFromReader(message: CreateShelfRequest, reader: jspb.BinaryReader): CreateShelfRequest;
}

export namespace CreateShelfRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    name?: title_pb.Title.AsObject,
    id: string,
    scope: string,
  }
}

export class SaveShelfRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveShelfRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveShelfRequest): SaveShelfRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveShelfRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveShelfRequest;
  static deserializeBinaryFromReader(message: SaveShelfRequest, reader: jspb.BinaryReader): SaveShelfRequest;
}

export namespace SaveShelfRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    ownerid: string,
    scope: string,
    name?: title_pb.Title.AsObject,
    locked: boolean,
  }
}

export class DeleteShelfRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteShelfRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteShelfRequest): DeleteShelfRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteShelfRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteShelfRequest;
  static deserializeBinaryFromReader(message: DeleteShelfRequest, reader: jspb.BinaryReader): DeleteShelfRequest;
}

export namespace DeleteShelfRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    ownerid: string,
    scope: string,
  }
}

