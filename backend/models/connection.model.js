const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    connectionStatus: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "accepted",
    },
  },
  { timestamps: true },
);

connectionSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

const Connection = mongoose.model("connection", connectionSchema);
module.exports = Connection;
