// package: notekeeper
// file: tag.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as title_pb from "./title_pb";

export class Tag extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getScope(): string;
  setScope(value: string): void;

  getCreated(): string;
  setCreated(value: string): void;

  getUpdated(): string;
  setUpdated(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tag.AsObject;
  static toObject(includeInstance: boolean, msg: Tag): Tag.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Tag, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tag;
  static deserializeBinaryFromReader(message: Tag, reader: jspb.BinaryReader): Tag;
}

export namespace Tag {
  export type AsObject = {
    id: string,
    name?: title_pb.Title.AsObject,
    scope: string,
    created: string,
    updated: string,
  }
}

export class GetTagsRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTagsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTagsRequest): GetTagsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTagsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTagsRequest;
  static deserializeBinaryFromReader(message: GetTagsRequest, reader: jspb.BinaryReader): GetTagsRequest;
}

export namespace GetTagsRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    scope: string,
  }
}

export class GetTagsResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  clearTagsList(): void;
  getTagsList(): Array<Tag>;
  setTagsList(value: Array<Tag>): void;
  addTags(value?: Tag, index?: number): Tag;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTagsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTagsResponse): GetTagsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTagsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTagsResponse;
  static deserializeBinaryFromReader(message: GetTagsResponse, reader: jspb.BinaryReader): GetTagsResponse;
}

export namespace GetTagsResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    tagsList: Array<Tag.AsObject>,
  }
}

export class CreateTagRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): CreateTagRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTagRequest): CreateTagRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateTagRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTagRequest;
  static deserializeBinaryFromReader(message: CreateTagRequest, reader: jspb.BinaryReader): CreateTagRequest;
}

export namespace CreateTagRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    name?: title_pb.Title.AsObject,
    id: string,
    scope: string,
  }
}

export class SaveTagRequest extends jspb.Message {
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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveTagRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveTagRequest): SaveTagRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveTagRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveTagRequest;
  static deserializeBinaryFromReader(message: SaveTagRequest, reader: jspb.BinaryReader): SaveTagRequest;
}

export namespace SaveTagRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    ownerid: string,
    scope: string,
    name?: title_pb.Title.AsObject,
  }
}

export class DeleteTagRequest extends jspb.Message {
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
  toObject(includeInstance?: boolean): DeleteTagRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteTagRequest): DeleteTagRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteTagRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteTagRequest;
  static deserializeBinaryFromReader(message: DeleteTagRequest, reader: jspb.BinaryReader): DeleteTagRequest;
}

export namespace DeleteTagRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    ownerid: string,
    scope: string,
  }
}

