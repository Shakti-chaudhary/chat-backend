console.log("TypeScript node.ts project Testing ===>>>> ...");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./helpers/db.util";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { app, server } from "./helpers/socket.util";

dotenv.config();
const PORT = 5505;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-client-glpk.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port ${PORT} `);
});
