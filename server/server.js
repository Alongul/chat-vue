const express = require("express");
const jwt = require("./utils/jwt");

const app = express();
const wss = require("express-ws")(app).getWss();
const port = 3000;
// 存储连接数
const connectMap = new Map();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("cookie-parser")());

// 加载websocket
require("./router/websocket")(app, connectMap);

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// app.use((req, res, next) => {
//   if (req.cookies.token) {
//     const payload = jwt.verifyToken(req.cookies.token);
//     next();
//   } else {
//     res.send({
//       code: 401,
//       message: "无访问权限",
//     });
//   }
// });

// 加载路由
require("./router/index")(app, connectMap);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
