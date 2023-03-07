const express = require("express");
const expressWs = require("express-ws");

const app = express();
expressWs(app);
const port = 3000;
const conArr = [];

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/chatdb");
const Message = mongoose.model("messages", { name: String, message: String });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/list", (req, res) => {
  Message.find().then((list) => {
    res.json(list);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.ws("/", (ws, req) => {
  conArr.push(ws);
  ws.on("message", function (message) {
    const msg = new Message(JSON.parse(message));
    msg.save();
    for (let i = 0; i < conArr.length; i++) {
      conArr[i].send(message);
    }
  });
});
