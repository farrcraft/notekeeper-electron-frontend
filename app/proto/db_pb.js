/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var common_pb = require('./common_pb.js');
goog.exportSymbol('proto.notekeeper.OpenMasterDbRequest', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.notekeeper.OpenMasterDbRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.notekeeper.OpenMasterDbRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.notekeeper.OpenMasterDbRequest.displayName = 'proto.notekeeper.OpenMasterDbRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.notekeeper.OpenMasterDbRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.notekeeper.OpenMasterDbRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.notekeeper.OpenMasterDbRequest} msg The msg instance to transform.
 * @return {!Object}
 */
proto.notekeeper.OpenMasterDbRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    header: (f = msg.getHeader()) && common_pb.RequestHeader.toObject(includeInstance, f),
    path: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.notekeeper.OpenMasterDbRequest}
 */
proto.notekeeper.OpenMasterDbRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.notekeeper.OpenMasterDbRequest;
  return proto.notekeeper.OpenMasterDbRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.notekeeper.OpenMasterDbRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.notekeeper.OpenMasterDbRequest}
 */
proto.notekeeper.OpenMasterDbRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new common_pb.RequestHeader;
      reader.readMessage(value,common_pb.RequestHeader.deserializeBinaryFromReader);
      msg.setHeader(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPath(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.notekeeper.OpenMasterDbRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.notekeeper.OpenMasterDbRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.notekeeper.OpenMasterDbRequest} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.notekeeper.OpenMasterDbRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeader();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      common_pb.RequestHeader.serializeBinaryToWriter
    );
  }
  f = message.getPath();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional RequestHeader header = 1;
 * @return {?proto.notekeeper.RequestHeader}
 */
proto.notekeeper.OpenMasterDbRequest.prototype.getHeader = function() {
  return /** @type{?proto.notekeeper.RequestHeader} */ (
    jspb.Message.getWrapperField(this, common_pb.RequestHeader, 1));
};


/** @param {?proto.notekeeper.RequestHeader|undefined} value */
proto.notekeeper.OpenMasterDbRequest.prototype.setHeader = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.notekeeper.OpenMasterDbRequest.prototype.clearHeader = function() {
  this.setHeader(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.notekeeper.OpenMasterDbRequest.prototype.hasHeader = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string path = 2;
 * @return {string}
 */
proto.notekeeper.OpenMasterDbRequest.prototype.getPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.notekeeper.OpenMasterDbRequest.prototype.setPath = function(value) {
  jspb.Message.setField(this, 2, value);
};


goog.object.extend(exports, proto.notekeeper);