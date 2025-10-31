const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");

const getUserDetails = async (req, res) => {
  console.log("Entered API");
  const { userId } = req.params;
  try {
    console.log("Entered try");
    const user = await User.findOne({ _id: userId }).select("-password");
    console.log("User fetched");
    if (user) {
      console.log("User Found");
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
    res.status(200).json({ posts });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(500).json({ message: "Server Error Occured" });
  }
};

module.exports = { getUserDetails, getUserPosts };
