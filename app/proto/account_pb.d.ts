// package: notekeeper
// file: account.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class AccountStateResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  getSignedin(): boolean;
  setSignedin(value: boolean): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  getExists(): boolean;
  setExists(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountStateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AccountStateResponse): AccountStateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountStateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountStateResponse;
  static deserializeBinaryFromReader(message: AccountStateResponse, reader: jspb.BinaryReader): AccountStateResponse;
}

export namespace AccountStateResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    signedin: boolean,
    locked: boolean,
    exists: boolean,
  }
}

export class CreateAccountRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPassphrase(): string;
  setPassphrase(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateAccountRequest): CreateAccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateAccountRequest;
  static deserializeBinaryFromReader(message: CreateAccountRequest, reader: jspb.BinaryReader): CreateAccountRequest;
}

export namespace CreateAccountRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    name: string,
    email: string,
    passphrase: string,
  }
}

export class UserId extends jspb.Message {
  getAccountid(): string;
  setAccountid(value: string): void;

  getUserid(): string;
  setUserid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserId.AsObject;
  static toObject(includeInstance: boolean, msg: UserId): UserId.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserId;
  static deserializeBinaryFromReader(message: UserId, reader: jspb.BinaryReader): UserId;
}

export namespace UserId {
  export type AsObject = {
    accountid: string,
    userid: string,
  }
}

export class UserIdResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): UserId | undefined;
  setUser(value?: UserId): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserIdResponse): UserIdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserIdResponse;
  static deserializeBinaryFromReader(message: UserIdResponse, reader: jspb.BinaryReader): UserIdResponse;
}

export namespace UserIdResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    user?: UserId.AsObject,
  }
}

export class UnlockAccountRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getId(): string;
  setId(value: string): void;

  getPassphrase(): string;
  setPassphrase(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnlockAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UnlockAccountRequest): UnlockAccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnlockAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnlockAccountRequest;
  static deserializeBinaryFromReader(message: UnlockAccountRequest, reader: jspb.BinaryReader): UnlockAccountRequest;
}

export namespace UnlockAccountRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    id: string,
    passphrase: string,
  }
}

export class SigninAccountRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPassphrase(): string;
  setPassphrase(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SigninAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SigninAccountRequest): SigninAccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SigninAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SigninAccountRequest;
  static deserializeBinaryFromReader(message: SigninAccountRequest, reader: jspb.BinaryReader): SigninAccountRequest;
}

export namespace SigninAccountRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    name: string,
    email: string,
    passphrase: string,
  }
}

