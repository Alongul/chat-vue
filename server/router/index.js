const dbserver = require("../dao/dbserver");
const jwt = require("../utils/jwt");

module.exports = function (app, connectMap) {
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
    dbserver.userLogin(req.body, res);
  });
  app.post("/searchusers", (req, res) => {
    dbserver.searchUsers(req.body.name, res);
  });
  app.post("/searchfriends", (req, res) => {
    const payload = jwt.verifyToken(req.cookies.token);
    dbserver.searchFriends(payload.id, res);
  });
  app.post("/querynewfriends", (req, res) => {
    const payload = jwt.verifyToken(req.cookies.token);
    dbserver.querynewfriends(payload.id, res);
  });
  app.post("/reqfriend", (req, res) => {
    const payload = jwt.verifyToken(req.cookies.token);
    dbserver.friendReq(req.body.id, payload.id, res);
  });
  app.post("/agree", (req, res) => {
    dbserver.operateReq(req.body.id, res);
  });
  app.post("/opensession", (req, res) => {
    const payload = jwt.verifyToken(req.cookies.token);
    dbserver.openSesssion(req.body.id, payload.id, res);
  });
  app.post("/querysessionlist", (req, res) => {
    const payload = jwt.verifyToken(req.cookies.token);
    dbserver.querySesssionList(payload.id, res);
  });
  app.post("/querymessage", (req, res) => {
    dbserver.queryMessageList(req.body.sessionId, res);
  });
};
