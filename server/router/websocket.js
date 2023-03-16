const jwt = require("../utils/jwt");
const dbserver = require("../dao/dbserver");

module.exports = function (app, connectMap) {
  app.ws("/session", function (ws, req) {
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
        dbserver
          .saveMessage(data)
          .then((doc) => {
            connectMap.get(data.sessionId).forEach((item) => {
              item.send(msg);
              connectMap.get(data.receiveId).send(
                JSON.stringify({
                  sessionId: data.sessionId,
                  time: data.time,
                  latestMsg: data.message,
                })
              );
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
};
