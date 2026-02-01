const mongoose = require("mongoose");

const followRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  followingId: { type: mongoose.Schema.ObjectId, ref: "user" },
  followingUsername: { type: String },
});

const FollowRequest = mongoose.model("followRequest", followRequestSchema);
module.exports = FollowRequest;
