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
  userId: Schema.Types.ObjectId,
  friendId: Schema.Types.ObjectId,
  time: Date,
});

const SchemaMessage = new Schema({
  userId: Schema.Types.ObjectId,
  friendId: Schema.Types.ObjectId,
  message: String,
  type: String,
  time: Date,
});

exports.UserModel = db.model("users", SchemaUser);
exports.FriendsModel = db.model("friends", SchemaFriends);
exports.MessageModel = db.model("messages", SchemaMessage);
