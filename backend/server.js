const express = require("express");
const bcrypt = require("bcrypt");
const { CreateServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config(app);
app.cors();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const httpServer = CreateServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);
});

httpServer.listen(5000, () => {
  console.log("Server running on port 5000");
});
