const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const routes = require("./routes");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = 5000;

app.use(routes);

io.on("connection", (socket) => {
  socket.on("join", (payload, callback) => {

    const { error, user } = addUser({
      id: socket.id,
      name: payload.name,
      room: payload.room,
      description: payload.description,
    });


    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "admin",
      text: `Welcome to the room ${user.name}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has just joined in`,
    });

    // User joining a room
    socket.join(user.room);

    // Consume the callback
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Server Is Running");
});
