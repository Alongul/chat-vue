const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jwt");

const UserModel = require("../model/dbmodel").UserModel;
const FriendsModel = require("../model/dbmodel").FriendsModel;
const MessageModel = require("../model/dbmodel").MessageModel;

// 新增用户
exports.addUser = function (user, res) {
  user.password = bcrypt.encrypt(user.password);
  UserModel.count({ name: user.name }).then((count) => {
    if (count === 0) {
      UserModel.create(user)
        .then((data) => {
          res.send({
            code: 200,
            message: "注册成功",
          });
        })
        .catch((err) => {
          res.send({
            code: 500,
            message: "注册失败",
          });
        });
    } else {
      res.send({
        code: 500,
        message: "用户名已存在",
      });
    }
  });
};

// 用户登录
exports.userLogin = function (user, res) {
  UserModel.findOne({ name: user.name })
    .then((doc) => {
      if (bcrypt.verification(user.password, doc.password)) {
        const token = jwt.generateToken(doc.id);
        res.send({
          code: 200,
          message: "登录成功",
          data: {
            name: doc.name,
            imgUrl: doc.imgUrl,
            token,
          },
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
        message: "用户不存在",
      });
    });
};

// 查找用户
exports.searchUsers = function (name, res) {
  UserModel.find({ name })
    .then((docs) => {
      res.send({
        code: 200,
        message: "登录成功",
        data: docs.map((item) => {
          return {
            name: item.name,
            imgUrl: item.imgUrl,
            introduce: item.introduce,
          };
        }),
      });
    })
    .catch(() => {
      res.send({
        code: 500,
        message: "用户不存在",
      });
    });
};

// 发起好友请求
exports.friendReq = function (user, friend, res) {};
