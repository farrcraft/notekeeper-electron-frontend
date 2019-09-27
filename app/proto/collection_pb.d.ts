// package: notekeeper
// file: collection.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as title_pb from "./title_pb";

export class Collection extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  getShelfid(): string;
  setShelfid(value: string): void;

  getCreated(): string;
  setCreated(value: string): void;

  getUpdated(): string;
  setUpdated(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Collection.AsObject;
  static toObject(includeInstance: boolean, msg: Collection): Collection.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Collection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Collection;
  static deserializeBinaryFromReader(message: Collection, reader: jspb.BinaryReader): Collection;
}

export namespace Collection {
  export type AsObject = {
    id: string,
    name?: title_pb.Title.AsObject,
    locked: boolean,
    shelfid: string,
    created: string,
    updated: string,
  }
}

export class GetCollectionsRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getShelfid(): string;
  setShelfid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCollectionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCollectionsRequest): GetCollectionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCollectionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCollectionsRequest;
  static deserializeBinaryFromReader(message: GetCollectionsRequest, reader: jspb.BinaryReader): GetCollectionsRequest;
}

export namespace GetCollectionsRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    shelfid: string,
    scope: string,
  }
}

export class GetCollectionsResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  clearCollectionsList(): void;
  getCollectionsList(): Array<Collection>;
  setCollectionsList(value: Array<Collection>): void;
  addCollections(value?: Collection, index?: number): Collection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCollectionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCollectionsResponse): GetCollectionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCollectionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCollectionsResponse;
  static deserializeBinaryFromReader(message: GetCollectionsResponse, reader: jspb.BinaryReader): GetCollectionsResponse;
}

export namespace GetCollectionsResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    collectionsList: Array<Collection.AsObject>,
  }
}

export class CreateCollectionRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getShelfid(): string;
  setShelfid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCollectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCollectionRequest): CreateCollectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateCollectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCollectionRequest;
  static deserializeBinaryFromReader(message: CreateCollectionRequest, reader: jspb.BinaryReader): CreateCollectionRequest;
}

export namespace CreateCollectionRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    name?: title_pb.Title.AsObject,
    shelfid: string,
    scope: string,
  }
}

export class SaveCollectionRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getShelfid(): string;
  setShelfid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveCollectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveCollectionRequest): SaveCollectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveCollectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveCollectionRequest;
  static deserializeBinaryFromReader(message: SaveCollectionRequest, reader: jspb.BinaryReader): SaveCollectionRequest;
}

export namespace SaveCollectionRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    shelfid: string,
    scope: string,
    name?: title_pb.Title.AsObject,
    locked: boolean,
  }
}

export class DeleteCollectionRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getShelfid(): string;
  setShelfid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteCollectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteCollectionRequest): DeleteCollectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteCollectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteCollectionRequest;
  static deserializeBinaryFromReader(message: DeleteCollectionRequest, reader: jspb.BinaryReader): DeleteCollectionRequest;
}

export namespace DeleteCollectionRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    shelfid: string,
    scope: string,
  }
}

