const jwt = require("jsonwebtoken");
const secret = "chat_dll";

// 生成token
exports.generateToken = function (id) {
  const payload = { id: id, time: new Date() };
  const token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 * 120 });
  return token;
};

exports.verifyToken = function (e) {
  const payload = jwt.verify(e);
  return payload;
};
