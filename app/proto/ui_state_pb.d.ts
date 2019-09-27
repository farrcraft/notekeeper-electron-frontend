// package: notekeeper
// file: ui_state.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class LoadUIStateResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.ResponseHeader | undefined;
  setHeader(value?: common_pb.ResponseHeader): void;

  getWindowwidth(): number;
  setWindowwidth(value: number): void;

  getWindowheight(): number;
  setWindowheight(value: number): void;

  getWindowxposition(): number;
  setWindowxposition(value: number): void;

  getWindowyposition(): number;
  setWindowyposition(value: number): void;

  getWindowmaximized(): boolean;
  setWindowmaximized(value: boolean): void;

  getWindowminimized(): boolean;
  setWindowminimized(value: boolean): void;

  getWindowfullscreen(): boolean;
  setWindowfullscreen(value: boolean): void;

  getDisplaywidth(): number;
  setDisplaywidth(value: number): void;

  getDisplayheight(): number;
  setDisplayheight(value: number): void;

  getDisplayxposition(): number;
  setDisplayxposition(value: number): void;

  getDisplayyposition(): number;
  setDisplayyposition(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadUIStateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoadUIStateResponse): LoadUIStateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoadUIStateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadUIStateResponse;
  static deserializeBinaryFromReader(message: LoadUIStateResponse, reader: jspb.BinaryReader): LoadUIStateResponse;
}

export namespace LoadUIStateResponse {
  export type AsObject = {
    header?: common_pb.ResponseHeader.AsObject,
    windowwidth: number,
    windowheight: number,
    windowxposition: number,
    windowyposition: number,
    windowmaximized: boolean,
    windowminimized: boolean,
    windowfullscreen: boolean,
    displaywidth: number,
    displayheight: number,
    displayxposition: number,
    displayyposition: number,
  }
}

export class SaveUIStateRequest extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): common_pb.RequestHeader | undefined;
  setHeader(value?: common_pb.RequestHeader): void;

  getWindowwidth(): number;
  setWindowwidth(value: number): void;

  getWindowheight(): number;
  setWindowheight(value: number): void;

  getWindowxposition(): number;
  setWindowxposition(value: number): void;

  getWindowyposition(): number;
  setWindowyposition(value: number): void;

  getWindowmaximized(): boolean;
  setWindowmaximized(value: boolean): void;

  getWindowminimized(): boolean;
  setWindowminimized(value: boolean): void;

  getWindowfullscreen(): boolean;
  setWindowfullscreen(value: boolean): void;

  getDisplaywidth(): number;
  setDisplaywidth(value: number): void;

  getDisplayheight(): number;
  setDisplayheight(value: number): void;

  getDisplayxposition(): number;
  setDisplayxposition(value: number): void;

  getDisplayyposition(): number;
  setDisplayyposition(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveUIStateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveUIStateRequest): SaveUIStateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveUIStateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveUIStateRequest;
  static deserializeBinaryFromReader(message: SaveUIStateRequest, reader: jspb.BinaryReader): SaveUIStateRequest;
}

export namespace SaveUIStateRequest {
  export type AsObject = {
    header?: common_pb.RequestHeader.AsObject,
    windowwidth: number,
    windowheight: number,
    windowxposition: number,
    windowyposition: number,
    windowmaximized: boolean,
    windowminimized: boolean,
    windowfullscreen: boolean,
    displaywidth: number,
    displayheight: number,
    displayxposition: number,
    displayyposition: number,
  }
}

