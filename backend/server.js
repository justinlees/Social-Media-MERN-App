const express = require("express");
const bcrypt = require("bcrypt");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./lib/db.js");

const userRouter = require("./routes/user.routes.js");
const authRouter = require("./routes/auth.routes.js");

const app = express();
dotenv.config(app);
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

app.use("/account", authRouter);
app.use("/", userRouter);

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);
});

connectDB().then(() => {
  httpServer.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});
