/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var common_pb = require('./common_pb.js');
goog.exportSymbol('proto.notekeeper.EmptyRequest', null, global);
goog.exportSymbol('proto.notekeeper.EmptyResponse', null, global);
goog.exportSymbol('proto.notekeeper.IdRequest', null, global);
goog.exportSymbol('proto.notekeeper.IdResponse', null, global);

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
proto.notekeeper.EmptyRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.notekeeper.EmptyRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.notekeeper.EmptyRequest.displayName = 'proto.notekeeper.EmptyRequest';
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
proto.notekeeper.EmptyRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.notekeeper.EmptyRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.notekeeper.EmptyRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.notekeeper.EmptyRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    header: (f = msg.getHeader()) && common_pb.RequestHeader.toObject(includeInstance, f)
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
 * @return {!proto.notekeeper.EmptyRequest}
 */
proto.notekeeper.EmptyRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.notekeeper.EmptyRequest;
  return proto.notekeeper.EmptyRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.notekeeper.EmptyRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.notekeeper.EmptyRequest}
 */
proto.notekeeper.EmptyRequest.deserializeBinaryFromReader = function(msg, reader) {
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
proto.notekeeper.EmptyRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.notekeeper.EmptyRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.notekeeper.EmptyRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.notekeeper.EmptyRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeader();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      common_pb.RequestHeader.serializeBinaryToWriter
    );
  }
};


/**
 * optional RequestHeader header = 1;
 * @return {?proto.notekeeper.RequestHeader}
 */
proto.notekeeper.EmptyRequest.prototype.getHeader = function() {
  return /** @type{?proto.notekeeper.RequestHeader} */ (
    jspb.Message.getWrapperField(this, common_pb.RequestHeader, 1));
};


/** @param {?proto.notekeeper.RequestHeader|undefined} value */
proto.notekeeper.EmptyRequest.prototype.setHeader = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.notekeeper.EmptyRequest.prototype.clearHeader = function() {
  this.setHeader(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.notekeeper.EmptyRequest.prototype.hasHeader = function() {
  return jspb.Message.getField(this, 1) != null;
};



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
proto.notekeeper.EmptyResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.notekeeper.EmptyResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.notekeeper.EmptyResponse.displayName = 'proto.notekeeper.EmptyResponse';
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
proto.notekeeper.EmptyResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.notekeeper.EmptyResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.notekeeper.EmptyResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.notekeeper.EmptyResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    header: (f = msg.getHeader()) && common_pb.ResponseHeader.toObject(includeInstance, f)
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
 * @return {!proto.notekeeper.EmptyResponse}
 */
proto.notekeeper.EmptyResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.notekeeper.EmptyResponse;
  return proto.notekeeper.EmptyResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.notekeeper.EmptyResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.notekeeper.EmptyResponse}
 */
proto.notekeeper.EmptyResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new common_pb.ResponseHeader;
      reader.readMessage(value,common_pb.ResponseHeader.deserializeBinaryFromReader);
      msg.setHeader(value);
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
proto.notekeeper.EmptyResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.notekeeper.EmptyResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.notekeeper.EmptyResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.notekeeper.EmptyResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeader();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      common_pb.ResponseHeader.serializeBinaryToWriter
    );
  }
};


/**
 * optional ResponseHeader header = 1;
 * @return {?proto.notekeeper.ResponseHeader}
 */
proto.notekeeper.EmptyResponse.prototype.getHeader = function() {
  return /** @type{?proto.notekeeper.ResponseHeader} */ (
    jspb.Message.getWrapperField(this, common_pb.ResponseHeader, 1));
};


/** @param {?proto.notekeeper.ResponseHeader|undefined} value */
proto.notekeeper.EmptyResponse.prototype.setHeader = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.notekeeper.EmptyResponse.prototype.clearHeader = function() {
  this.setHeader(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.notekeeper.EmptyResponse.prototype.hasHeader = function() {
  return jspb.Message.getField(this, 1) != null;
};



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
proto.notekeeper.IdRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.notekeeper.IdRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.notekeeper.IdRequest.displayName = 'proto.notekeeper.IdRequest';
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
proto.notekeeper.IdRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.notekeeper.IdRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.notekeeper.IdRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.notekeeper.IdRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    header: (f = msg.getHeader()) && common_pb.RequestHeader.toObject(includeInstance, f),
    id: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.notekeeper.IdRequest}
 */
proto.notekeeper.IdRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.notekeeper.IdRequest;
  return proto.notekeeper.IdRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.notekeeper.IdRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.notekeeper.IdRequest}
 */
proto.notekeeper.IdRequest.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setId(value);
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
proto.notekeeper.IdRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.notekeeper.IdRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.notekeeper.IdRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.notekeeper.IdRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeader();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      common_pb.RequestHeader.serializeBinaryToWriter
    );
  }
  f = message.getId();
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
proto.notekeeper.IdRequest.prototype.getHeader = function() {
  return /** @type{?proto.notekeeper.RequestHeader} */ (
    jspb.Message.getWrapperField(this, common_pb.RequestHeader, 1));
};


/** @param {?proto.notekeeper.RequestHeader|undefined} value */
proto.notekeeper.IdRequest.prototype.setHeader = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.notekeeper.IdRequest.prototype.clearHeader = function() {
  this.setHeader(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.notekeeper.IdRequest.prototype.hasHeader = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string id = 2;
 * @return {string}
 */
proto.notekeeper.IdRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.notekeeper.IdRequest.prototype.setId = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};



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
proto.notekeeper.IdResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.notekeeper.IdResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.notekeeper.IdResponse.displayName = 'proto.notekeeper.IdResponse';
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
proto.notekeeper.IdResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.notekeeper.IdResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.notekeeper.IdResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.notekeeper.IdResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    header: (f = msg.getHeader()) && common_pb.ResponseHeader.toObject(includeInstance, f),
    id: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.notekeeper.IdResponse}
 */
proto.notekeeper.IdResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.notekeeper.IdResponse;
  return proto.notekeeper.IdResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.notekeeper.IdResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.notekeeper.IdResponse}
 */
proto.notekeeper.IdResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new common_pb.ResponseHeader;
      reader.readMessage(value,common_pb.ResponseHeader.deserializeBinaryFromReader);
      msg.setHeader(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
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
proto.notekeeper.IdResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.notekeeper.IdResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.notekeeper.IdResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.notekeeper.IdResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeader();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      common_pb.ResponseHeader.serializeBinaryToWriter
    );
  }
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional ResponseHeader header = 1;
 * @return {?proto.notekeeper.ResponseHeader}
 */
proto.notekeeper.IdResponse.prototype.getHeader = function() {
  return /** @type{?proto.notekeeper.ResponseHeader} */ (
    jspb.Message.getWrapperField(this, common_pb.ResponseHeader, 1));
};


/** @param {?proto.notekeeper.ResponseHeader|undefined} value */
proto.notekeeper.IdResponse.prototype.setHeader = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.notekeeper.IdResponse.prototype.clearHeader = function() {
  this.setHeader(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.notekeeper.IdResponse.prototype.hasHeader = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string id = 2;
 * @return {string}
 */
proto.notekeeper.IdResponse.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.notekeeper.IdResponse.prototype.setId = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto.notekeeper);
