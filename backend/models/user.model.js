const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  bioData: { type: String, default: "" },
  accountType: { type: String, required: true, default: "public" },
  isStar: { type: Boolean, default: false },
  profileImage: { type: String, default: "" },
  following: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
