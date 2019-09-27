// package: notekeeper
// file: note.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as title_pb from "./title_pb";

export class Note extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getNotebookid(): string;
  setNotebookid(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getStoreid(): string;
  setStoreid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  getStore(): string;
  setStore(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  getType(): string;
  setType(value: string): void;

  getRevisions(): number;
  setRevisions(value: number): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  getCreated(): string;
  setCreated(value: string): void;

  getUpdated(): string;
  setUpdated(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Note.AsObject;
  static toObject(includeInstance: boolean, msg: Note): Note.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Note, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Note;
  static deserializeBinaryFromReader(message: Note, reader: jspb.BinaryReader): Note;
}

export namespace Note {
  export type AsObject = {
    id: string,
    notebookid: string,
    ownerid: string,
    storeid: string,
    scope: string,
    store: string,
    name?: title_pb.Title.AsObject,
    type: string,
    revisions: number,
    locked: boolean,
    created: string,
    updated: string,
  }
}

export class CreateNoteRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getNotebookid(): string;
  setNotebookid(value: string): void;

  getStoreid(): string;
  setStoreid(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  getStore(): string;
  setStore(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateNoteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateNoteRequest): CreateNoteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateNoteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateNoteRequest;
  static deserializeBinaryFromReader(message: CreateNoteRequest, reader: jspb.BinaryReader): CreateNoteRequest;
}

export namespace CreateNoteRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    notebookid: string,
    storeid: string,
    ownerid: string,
    scope: string,
    store: string,
    name?: title_pb.Title.AsObject,
  }
}

export class SaveNoteRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getNotebookid(): string;
  setNotebookid(value: string): void;

  getStoreid(): string;
  setStoreid(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  getStore(): string;
  setStore(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): title_pb.Title | undefined;
  setName(value?: title_pb.Title): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveNoteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveNoteRequest): SaveNoteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveNoteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveNoteRequest;
  static deserializeBinaryFromReader(message: SaveNoteRequest, reader: jspb.BinaryReader): SaveNoteRequest;
}

export namespace SaveNoteRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    notebookid: string,
    storeid: string,
    ownerid: string,
    scope: string,
    store: string,
    name?: title_pb.Title.AsObject,
  }
}

export class DeleteNoteRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getNotebookid(): string;
  setNotebookid(value: string): void;

  getStoreid(): string;
  setStoreid(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  getStore(): string;
  setStore(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteNoteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteNoteRequest): DeleteNoteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteNoteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteNoteRequest;
  static deserializeBinaryFromReader(message: DeleteNoteRequest, reader: jspb.BinaryReader): DeleteNoteRequest;
}

export namespace DeleteNoteRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    notebookid: string,
    storeid: string,
    ownerid: string,
    scope: string,
    store: string,
  }
}

export class LoadNoteRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getStoreid(): string;
  setStoreid(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  getStore(): string;
  setStore(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadNoteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoadNoteRequest): LoadNoteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoadNoteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadNoteRequest;
  static deserializeBinaryFromReader(message: LoadNoteRequest, reader: jspb.BinaryReader): LoadNoteRequest;
}

export namespace LoadNoteRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    storeid: string,
    ownerid: string,
    scope: string,
    store: string,
  }
}

export class LoadNoteResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  hasNote(): boolean;
  clearNote(): void;
  getNote(): Note | undefined;
  setNote(value?: Note): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadNoteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoadNoteResponse): LoadNoteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoadNoteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadNoteResponse;
  static deserializeBinaryFromReader(message: LoadNoteResponse, reader: jspb.BinaryReader): LoadNoteResponse;
}

export namespace LoadNoteResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    note?: Note.AsObject,
  }
}

export class GetNotesRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getNotebookid(): string;
  setNotebookid(value: string): void;

  getStoreid(): string;
  setStoreid(value: string): void;

  getOwnerid(): string;
  setOwnerid(value: string): void;

  getScope(): string;
  setScope(value: string): void;

  getStore(): string;
  setStore(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNotesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetNotesRequest): GetNotesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNotesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNotesRequest;
  static deserializeBinaryFromReader(message: GetNotesRequest, reader: jspb.BinaryReader): GetNotesRequest;
}

export namespace GetNotesRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    notebookid: string,
    storeid: string,
    ownerid: string,
    scope: string,
    store: string,
  }
}

export class GetNotesResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  clearNotesList(): void;
  getNotesList(): Array<Note>;
  setNotesList(value: Array<Note>): void;
  addNotes(value?: Note, index?: number): Note;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNotesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetNotesResponse): GetNotesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNotesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNotesResponse;
  static deserializeBinaryFromReader(message: GetNotesResponse, reader: jspb.BinaryReader): GetNotesResponse;
}

export namespace GetNotesResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    notesList: Array<Note.AsObject>,
  }
}

