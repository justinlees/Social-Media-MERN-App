const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  followingId: { type: mongoose.Schema.ObjectId, ref: "user" },
  followingUsername: { type: String },
});

const Following = mongoose.model("following", followingSchema);
module.exports = Following;
