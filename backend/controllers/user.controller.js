const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");

const getUserDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId }).select("-password");
    if (user) {
      res.status(200).json({ user });
    }
    res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    res.status(500).json({ message: "server Error" });
    console.log("Error occured", error);
  }
};

const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ userId });
    res.status(200).json({ posts });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(500).json({ message: "Server Error Occured" });
  }
};

module.exports = { getUserDetails, getUserPosts };
