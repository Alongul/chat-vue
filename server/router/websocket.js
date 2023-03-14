const jwt = require("../utils/jwt");

module.exports = function (app, connectMap) {
  app.ws("/", function (ws, req) {
    if (req.cookies.token) {
      const payload = jwt.verifyToken(req.cookies.token);
      connectMap.set(payload.id, ws);
    }
    ws.on("message", function (msg) {
      console.log(msg);
    });
  });
};
