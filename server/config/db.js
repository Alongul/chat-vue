const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb://127.0.0.1:27017/chatdb");
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("已连接");
});
module.exports = db;
