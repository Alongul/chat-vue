const jwt = require("jsonwebtoken");

exports.generateToken = function (id, res) {
  const payload = { id: id, time: new Date() };
};
