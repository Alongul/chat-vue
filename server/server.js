const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 加载路由
require("./router/index")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
