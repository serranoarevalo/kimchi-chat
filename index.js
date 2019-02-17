import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;

const app = express();

app.set("view engine", "pug");

app.use(express.static("public"));

app.use(logger("tiny"));

app.get("/", (_, res) => res.render("index"));

const server = app.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}`)
);

const io = socketIO.listen(server);

io.on("connect", socket => {
  socket.on("logIn", data => {
    const { value } = data;
    socket.name = value;
    socket.broadcast.emit("newPerson", { value });
  });
  socket.on("newMessage", data => {
    const { value } = data;

    socket.broadcast.emit("newMessageReceived", {
      from: socket.name,
      message: value
    });
  });
});
