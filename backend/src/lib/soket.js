import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

// applying authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// to store online users
const userSocketMap = {}; //{userId:SocketId}
io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // to.emit() is used to send events to all connnected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we listen events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
