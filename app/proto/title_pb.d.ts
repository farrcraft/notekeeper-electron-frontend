// package: notekeeper
// file: title.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class Title extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getBold(): boolean;
  setBold(value: boolean): void;

  getItalics(): boolean;
  setItalics(value: boolean): void;

  getUnderscore(): boolean;
  setUnderscore(value: boolean): void;

  getStrike(): boolean;
  setStrike(value: boolean): void;

  getColor(): string;
  setColor(value: string): void;

  getBackground(): string;
  setBackground(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Title.AsObject;
  static toObject(includeInstance: boolean, msg: Title): Title.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Title, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Title;
  static deserializeBinaryFromReader(message: Title, reader: jspb.BinaryReader): Title;
}

export namespace Title {
  export type AsObject = {
    text: string,
    bold: boolean,
    italics: boolean,
    underscore: boolean,
    strike: boolean,
    color: string,
    background: string,
  }
}

