const bcrypt = require("../config/bcrypt");

const UserModel = require("../model/dbmodel").UserModel;
const FriendsModel = require("../model/dbmodel").FriendsModel;
const MessageModel = require("../model/dbmodel").MessageModel;

exports.addUser = function (user, res) {
  user.password = bcrypt.encrypt(user.password);
  UserModel.create(user)
    .then((data) => {
      res.send({
        code: 200,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
      });
    });
};
exports.FindUserByName = function (user, res) {
  UserModel.findOne({ name: user.name })
    .then((doc) => {
      if (bcrypt.verification(user.password, doc.password)) {
        res.send({
          code: 200,
          message: "登录成功",
        });
      } else {
        res.send({
          code: 500,
          message: "密码不正确",
        });
      }
    })
    .catch(() => {
      res.send({
        code: 500,
      });
    });
};
