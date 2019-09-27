// package: notekeeper
// file: notebook.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as title_pb from "./title_pb";

export class Notebook extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getScope(): string;
  setScope(value: string): void;

  getContainer(): string;
  setContainer(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getContainerid(): string;
  setContainerid(value: string): void;

  getDefault(): boolean;
  setDefault(value: boolean): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  getNotecount(): number;
  setNotecount(value: number): void;

  getCreated(): string;
  setCreated(value: string): void;

  getUpdated(): string;
  setUpdated(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Notebook.AsObject;
  static toObject(includeInstance: boolean, msg: Notebook): Notebook.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Notebook, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Notebook;
  static deserializeBinaryFromReader(message: Notebook, reader: jspb.BinaryReader): Notebook;
}

export namespace Notebook {
  export type AsObject = {
    id: string,
    name?: title_pb.Title.AsObject,
    scope: string,
    container: string,
    ownerid: string,
    containerid: string,
    pb_default: boolean,
    locked: boolean,
    notecount: number,
    created: string,
    updated: string,
  }
}

export class CreateNotebookRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getScope(): string;
  setScope(value: string): void;

  getContainer(): string;
  setContainer(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getContainerid(): string;
  setContainerid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateNotebookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateNotebookRequest): CreateNotebookRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateNotebookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateNotebookRequest;
  static deserializeBinaryFromReader(message: CreateNotebookRequest, reader: jspb.BinaryReader): CreateNotebookRequest;
}

export namespace CreateNotebookRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    name?: title_pb.Title.AsObject,
    scope: string,
    container: string,
    ownerid: string,
    containerid: string,
  }
}

export class SaveNotebookRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getScope(): string;
  setScope(value: string): void;

  getContainer(): string;
  setContainer(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getContainerid(): string;
  setContainerid(value: string): void;

  getDefault(): boolean;
  setDefault(value: boolean): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveNotebookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveNotebookRequest): SaveNotebookRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveNotebookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveNotebookRequest;
  static deserializeBinaryFromReader(message: SaveNotebookRequest, reader: jspb.BinaryReader): SaveNotebookRequest;
}

export namespace SaveNotebookRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    name?: title_pb.Title.AsObject,
    scope: string,
    container: string,
    ownerid: string,
    containerid: string,
    pb_default: boolean,
    locked: boolean,
  }
}

export class GetNotebooksRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getScope(): string;
  setScope(value: string): void;

  getContainer(): string;
  setContainer(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getContainerid(): string;
  setContainerid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNotebooksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetNotebooksRequest): GetNotebooksRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNotebooksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNotebooksRequest;
  static deserializeBinaryFromReader(message: GetNotebooksRequest, reader: jspb.BinaryReader): GetNotebooksRequest;
}

export namespace GetNotebooksRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    scope: string,
    container: string,
    ownerid: string,
    containerid: string,
  }
}

export class GetNotebooksResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  clearNotebooksList(): void;
  getNotebooksList(): Array<Notebook>;
  setNotebooksList(value: Array<Notebook>): void;
  addNotebooks(value?: Notebook, index?: number): Notebook;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNotebooksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetNotebooksResponse): GetNotebooksResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNotebooksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNotebooksResponse;
  static deserializeBinaryFromReader(message: GetNotebooksResponse, reader: jspb.BinaryReader): GetNotebooksResponse;
}

export namespace GetNotebooksResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    notebooksList: Array<Notebook.AsObject>,
  }
}

export class DeleteNotebookRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  getContainer(): string;
  setContainer(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getContainerid(): string;
  setContainerid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteNotebookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteNotebookRequest): DeleteNotebookRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteNotebookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteNotebookRequest;
  static deserializeBinaryFromReader(message: DeleteNotebookRequest, reader: jspb.BinaryReader): DeleteNotebookRequest;
}

export namespace DeleteNotebookRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    scope: string,
    container: string,
    ownerid: string,
    containerid: string,
  }
}

