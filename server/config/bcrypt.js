const bcrypt = require("bcryptjs");

exports.encrypt = function (e) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(e, salt);
  return hash;
};

exports.verification = function (e, hash) {
  return bcrypt.compareSync(e, hash);
};
