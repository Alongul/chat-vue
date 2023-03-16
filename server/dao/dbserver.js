const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jwt");

const UserModel = require("../model/dbmodel").UserModel;
const FriendsModel = require("../model/dbmodel").FriendsModel;
const MessageModel = require("../model/dbmodel").MessageModel;
const SessionModel = require("../model/dbmodel").SessionModel;

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
            data: 1,
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
            id: doc._id,
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

// 查找所有用户
exports.searchUsers = function (key, res) {
  UserModel.find({ name: new RegExp(key) })
    .then((docs) => {
      res.send({
        code: 200,
        message: "查找成功",
        data: docs.map((item) => {
          return {
            id: item.id,
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
        message: "查找失败",
      });
    });
};

// 查找好友
exports.searchFriends = function (clientId, res) {
  FriendsModel.find({ state: "1" })
    .or([{ userId: clientId }, { friendId: clientId }])
    .populate(["userId", "friendId"])
    .then((docs) => {
      res.send({
        code: 200,
        message: "查找成功",
        data: docs.map((item) => {
          if (item.userId._id.toString() === clientId) {
            return {
              id: item._id,
              friendId: item.friendId._id,
              name: item.friendId.name,
              imgUrl: item.friendId.imgUrl,
              introduce: item.friendId.introduce,
            };
          } else {
            return {
              id: item._id,
              friendId: item.userId._id,
              name: item.userId.name,
              imgUrl: item.userId.imgUrl,
              introduce: item.userId.introduce,
            };
          }
        }),
      });
    })
    .catch(() => {
      res.send({
        code: 500,
        message: "查找失败",
      });
    });
};

// 查找新朋友
exports.querynewfriends = function (clientId, res) {
  FriendsModel.find({ state: "0" })
    .or([{ userId: clientId }, { friendId: clientId }])
    .populate(["userId", "friendId"])
    .then((docs) => {
      res.send({
        code: 200,
        message: "查找成功",
        data: docs.map((item) => {
          if (item.userId._id === clientId) {
            return {
              id: item._id,
              friendId: item.friendId._id,
              name: item.friendId.name,
              imgUrl: item.friendId.imgUrl,
              introduce: item.friendId.introduce,
            };
          } else {
            return {
              id: item._id,
              friendId: item.userId._id,
              name: item.userId.name,
              imgUrl: item.userId.imgUrl,
              introduce: item.userId.introduce,
            };
          }
        }),
      });
    })
    .catch(() => {
      res.send({
        code: 500,
        message: "查找失败",
      });
    });
};

// 发起好友请求
exports.friendReq = function (friendId, userId, res, connectMap) {
  FriendsModel.create({
    userId,
    friendId,
    state: "0",
    time: new Date(),
  })
    .then((doc) => {
      // connectMap.get(friendId).send({
      //   message: "新的朋友",
      //   userId: friendId,
      //   friendId: userId,
      // });
      res.send({
        code: 200,
        message: "发起成功",
      });
    })
    .catch(() => {
      res.send({
        code: 500,
        message: "发起失败",
      });
    });
};

// 同意好友请求
exports.operateReq = function (id, res) {
  FriendsModel.updateOne(
    {
      _id: id,
    },
    { state: "1" }
  )
    .then(() => {
      res.send({
        code: 200,
        message: "成功",
      });
    })
    .catch(() => {
      res.send({
        code: 500,
        message: "网络失败",
      });
    });
};

// 创建一个新的会话
exports.openSesssion = function (friendId, clientId, res) {
  SessionModel.create({
    users: [clientId, friendId],
    latestMsg: "",
    time: new Date(),
  })
    .then((doc) => {
      res.send({
        code: 200,
        message: "创建成功",
        data: {
          sessionId: doc._id,
        },
      });
    })
    .catch(() => {
      res.send({
        code: 500,
        message: "网络异常",
      });
    });
};

// 查询会话列表
exports.querySesssionList = function (clientId, res) {
  SessionModel.find({
    users: {
      $elemMatch: {
        $eq: clientId,
      },
    },
  })
    .populate("users")
    .then((docs) => {
      res.send({
        code: 200,
        message: "查询成功",
        data: docs.map((item) => {
          const sessionInfo = item.users.find((item) => {
            return item._id.toString() !== clientId;
          });
          return {
            id: item._id,
            friendId: sessionInfo._id,
            name: sessionInfo.name,
            imgUrl: sessionInfo.imgUrl,
            latestMsg: item.latestMsg,
            time: item.time,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        code: 500,
        message: "网络异常",
      });
    });
};

// 保存消息
exports.saveMessage = function (data) {
  return MessageModel.create({
    sendId: data.sendId,
    receiveId: data.receiveId,
    sessionId: data.sessionId,
    message: data.message,
    type: data.type,
    time: new Date(),
    unread: "0",
  });
};

// 查询消息
exports.queryMessageList = function (sessionId, res) {
  MessageModel.find({
    sessionId,
  })
    .then((docs) => {
      res.send({
        code: 200,
        message: "发送成功",
        data: docs.map((item) => {
          return {
            sessionId: item.sessionId,
            sendId: item.sendId,
            receiveId: item.receiveId,
            message: item.message,
            type: item.type,
            time: item.time,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        code: 500,
        message: "网络异常",
      });
    });
};
