const express = require("express");
const bcrypt = require("bcrypt");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./lib/db.js");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user.routes.js");
const authRouter = require("./routes/auth.routes.js");

const app = express();
dotenv.config(app);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://10.0.70.119:5173",
      "http://10.0.70.86:5173",
      "http://10.0.70.108:5173",
      "http://10.0.70.82:5173",
      "http://10.0.97.111:5173",
    ],
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://10.0.70.119:5173",
      "http://10.0.70.86:5173",
      "http://10.0.70.108:5173",
      "http://10.0.70.82:5173/",
      "http://10.0.97.111:5173/",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use("/account", authRouter);
app.use("/", userRouter);

io.on("connection", (socket) => {
  socket.on("joinId", (chatId) => {
    socket.join(`${chatId}`);
  });
  socket.on("sendMessage", ({ formData, chatId }) => {
    io.to(`${chatId}`).emit("chatMsg", formData);
  });

  socket.on("notifyJoin", (userId) => {
    socket.join(userId);
  });
  socket.on("requestFollow", (followData) => {
    io.to(`${followData.followingId}`).emit("listenNotification", followData);
  });

  socket.on("followRequestId", (followRequestId) => {
    socket.join(followRequestId);
  });

  socket.on("sendRequestResponse", (followData) => {
    const requestId =
      followData.userId > followData.followingId
        ? `${followData.userId}-${followData.followingId}`
        : `${followData.followingId}-${followData.userId}`;
    io.to(requestId).emit("listenNotificationResponse", followData);
  });
});

connectDB().then(() => {
  httpServer.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});
