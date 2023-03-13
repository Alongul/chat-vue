const mongoose = require("mongoose");
const db = require("../config/db");
const Schema = mongoose.Schema;

const SchemaUser = new Schema({
  name: String,
  password: String,
  introduce: String,
  imgUrl: String,
});

const SchemaFriends = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: UserModel },
  friendId: { type: Schema.Types.ObjectId, ref: UserModel },
  time: Date,
});

const SchemaMessage = new Schema({
  sendId: { type: Schema.Types.ObjectId, ref: UserModel },
  receiveId: { type: Schema.Types.ObjectId, ref: UserModel },
  sessionId: { type: Schema.Types.ObjectId, ref: SessionModel },
  message: String,
  type: String,
  time: Date,
});

const SchemaSession = new Schema({
  sendId: { type: Schema.Types.ObjectId, ref: UserModel },
  receiveId: { type: Schema.Types.ObjectId, ref: UserModel },
  unread: Number,
  latestMsg: String,
  time: Date,
});

exports.UserModel = db.model("users", SchemaUser);
exports.FriendsModel = db.model("friends", SchemaFriends);
exports.MessageModel = db.model("messages", SchemaMessage);
exports.SessionModel = db.model("sessions", SchemaSession);
