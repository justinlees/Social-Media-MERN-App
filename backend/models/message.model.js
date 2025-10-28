const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.ObjectId, ref: "user" },
    receiverId: { type: mongoose.Schema.ObjectId, ref: "user" },
    text: { type: String },
    images: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
