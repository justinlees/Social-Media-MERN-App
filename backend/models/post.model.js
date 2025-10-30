const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "user" },
    postCaption: { type: String, required: true },
    likes: { type: Number },
    comments: { type: Number },
    postImage: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
