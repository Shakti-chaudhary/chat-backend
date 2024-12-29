import { Server } from "socket.io";
import http from "http";
import express from "express";

interface UserSocketMap {
  [userId: string]: string;
}

interface UserLastSeenMap {
  [userId: string]: string;
}

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-client-glpk.onrender.com",
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

const userSocketMap: UserSocketMap = {};
const userLastSeenMap: UserLastSeenMap = {};

export function getReceiverSocketId(userId: string): string | undefined {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId as string;

  if (!userId) {
    console.log("No userId provided, disconnecting socket");
    socket.disconnect();
    return;
  }

  // Store user connection
  userSocketMap[userId] = socket.id;
  if (userLastSeenMap[userId]) {
    delete userLastSeenMap[userId];
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  io.emit("getLastSeen", userLastSeenMap);

  socket.on("disconnect", () => {
    const disconnectedUserId = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key] === socket.id
    );

    console.log("A user disconnected", socket.id);

    if (disconnectedUserId) {
      userLastSeenMap[disconnectedUserId] = new Date().toISOString();
      delete userSocketMap[disconnectedUserId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    io.emit("getLastSeen", userLastSeenMap);
  });
});

export { io, app, server };
