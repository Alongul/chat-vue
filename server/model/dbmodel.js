const mongoose = require("mongoose");
const db = require("../config/db");
const Schema = mongoose.Schema;

// 用户
const SchemaUser = new Schema({
  name: String,
  password: String,
  introduce: String,
  imgUrl: String,
});
const UserModel = db.model("users", SchemaUser);

// 好友表
const SchemaFriends = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: UserModel },
  friendId: { type: Schema.Types.ObjectId, ref: UserModel },
  state: String, // 0 请求中，1 成为好友
  time: Date,
});
const FriendsModel = db.model("friends", SchemaFriends);

// 会话表
const SchemaSession = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: UserModel }],
  latestMsg: String,
  time: Date,
});
const SessionModel = db.model("sessions", SchemaSession);

// 消息表
const SchemaMessage = new Schema({
  sendId: { type: Schema.Types.ObjectId, ref: UserModel },
  receiveId: { type: Schema.Types.ObjectId, ref: UserModel },
  sessionId: { type: Schema.Types.ObjectId, ref: SessionModel },
  message: String,
  type: String,
  time: Date,
  unread: Boolean,
});
const MessageModel = db.model("messages", SchemaMessage);

exports.UserModel = UserModel;
exports.FriendsModel = FriendsModel;
exports.MessageModel = MessageModel;
exports.SessionModel = SessionModel;
