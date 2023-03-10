const dbserver = require("../dao/dbserver");

module.exports = function (app) {
  app.post("/adduser", (req, res) => {
    const user = {
      name: req.body.name,
      password: req.body.password,
      introduce: "",
      imgUrl: "",
    };
    dbserver.addUser(user, res);
  });
  app.post("/login", (req, res) => {
    dbserver.FindUserByName(req.body, res);
  });
};
