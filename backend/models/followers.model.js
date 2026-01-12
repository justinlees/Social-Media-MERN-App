const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  followerId: { type: mongoose.Schema.ObjectId, ref: "user" },
  followerUsername: { type: String },
});

const Followers = mongoose.model("followers", followerSchema);
module.exports = Followers;
