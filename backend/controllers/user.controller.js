const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");

const getUserDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId }).select("-password");

    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    console.log("Error occured", error);
    return res.status(500).json({ message: "server Error" });
  }
};

const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ userId });
    return res.status(200).json({ posts });
  } catch (error) {
    console.log("Error Occured", error);
    return res.status(500).json({ message: "Server Error Occured" });
  }
};

const userPostCreation = async (req, res) => {
  const { userId } = req.params;
  const { postImage, postCaption, userName } = req.body;
  try {
    const createPost = await Post.create({
      userId,
      postImage,
      postCaption,
      userName,
    });
    if (createPost) {
      return res.status(201).json({ message: "postCreated" });
    }
    return res.status(404).json({ message: "Error in post creation" });
  } catch (error) {
    console.log("Server Error", error);
    return res.status(500).json({ message: "server Error" });
  }
};

const incrementPostLike = async (req, res) => {
  const { _id, likedBy } = req.body;
  try {
    const incrementLike = await Post.findOneAndUpdate(
      { _id },
      { $inc: { likes: 1 } }
    );
    if (incrementLike) {
      return res.status(200).json({ message: "Liked the post" });
    }
    return res.status(404).json({ message: "Not liked the post" });
  } catch (error) {
    console.error("Server Error", error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ posts });
  } catch (error) {
    console.error("Server Error", error);
  }
};

module.exports = {
  getUserDetails,
  getUserPosts,
  userPostCreation,
  incrementPostLike,
  getAllPosts,
};
