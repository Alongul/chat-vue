const jwt = require("../utils/jwt");

module.exports = function (app, connectMap) {
  app.ws("/", function (ws, req) {
    ws.on("message", function (msg) {
      const data = JSON.parse(msg);
      connectMap.set(data.clientId, ws);
    });
  });
  app.ws("/message", function (ws, req) {
    ws.on("message", function (msg) {
      const data = JSON.parse(msg);
      if (data.initConnect) {
        if (connectMap.get(data.sessionId) instanceof Array) {
          connectMap.get(data.sessionId).push(ws);
        } else {
          connectMap.set(data.sessionId, []);
          connectMap.get(data.sessionId).push(ws);
        }
      } else {
        connectMap.get(data.sessionId).forEach((item) => {
          item.send(msg);
        });
      }
    });
  });
};
