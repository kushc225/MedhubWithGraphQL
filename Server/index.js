import { Server } from "socket.io";
const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
  pingTimeout: 30000,
});

let users = [];

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const addUser = (socketId) => {
  const user = { socketId };
  const idx = users.findIndex((u) => u.socketId === socketId);
  if (idx === -1) users.push(user);
};

io.on("connection", (socket) => {
  socket.on("join_socket", () => {
    console.log("user connected");
    addUser(socket.id);
    socket.emit("active_users", users);
  });

  socket.on("send-message", ({ message, room }) => {
    socket.to(room).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("active_users", users);
  });
});
