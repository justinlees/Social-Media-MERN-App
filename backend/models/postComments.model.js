const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  text: { type: String },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
