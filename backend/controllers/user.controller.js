const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");

// GET USER DETAILS
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

// GET USER POSTS
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

// CREATING USER'S POST
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

// LIKING A POST
const incrementPostLike = async (req, res) => {
  const { _id, userId } = req.body;
  try {
    const alreadyLiked = await Post.findOne({
      _id,
    });

    if (!alreadyLiked.likedBy.find(() => userId)) {
      const incrementLike = await Post.findOneAndUpdate(
        { _id },
        { $inc: { likes: 1 }, $push: { likedBy: userId } }
      );
      if (incrementLike) {
        return res.status(200).json({ message: "Liked the post" });
      }
      return res.status(404).json({ message: "Not liked the post" });
    } else {
      const decrementLike = await Post.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 }, $pull: { likedBy: userId } }
      );
      if (decrementLike) {
        return res.status(200).json({ message: "de-Liked the post" });
      }
      return res.status(404).json({ message: "Not de-Liked the post" });
    }
  } catch (error) {
    console.error("Server Error", error);
  }
};

// GET ALL EXISTING POSTS
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ posts });
  } catch (error) {
    console.error("Server Error", error);
  }
};

// EDIT USER DETAILS
const editUserDetails = async (req, res) => {
  const { fullName, dob, userName, mobile, email, accountType, bioData } =
    req.body;
  try {
    const editUser = await User.findOneAndUpdate(
      { userName },
      { fullName, dob, mobile, email, accountType, bioData }
    );
    if (editUser) return res.status(200);
    return res.status(404);
  } catch (error) {
    console.error("Error occured: ", error);
    return res.status(500).json({ message: error });
  }
};

// DELETE USER'S POST
const postDeletion = async (req, res) => {
  const { _id } = req.body;
  try {
    const deletePost = await Post.findOneAndDelete({ _id });
    if (deletePost) return res.status(200).json({ message: "Post Deleted" });
    return res.status(404).json({ message: "Post doesn't exist" });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json("Server Error:", error);
  }
};

// DELETE USER ACCOUNT

const userAccountDeletion = async (req, res) => {
  const { _id } = req.body;
  try {
    const deleteUser = await User.findOneAndDelete({ _id });
    if (deleteUser) {
      const deleteUserPosts = await Post.findOneAndDelete({ userId: _id });
      if (deleteUserPosts) {
        return res.status(200).json({ message: "UserDeleted" });
      }
    }
    return res.status(404);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getUserDetails,
  getUserPosts,
  userPostCreation,
  incrementPostLike,
  getAllPosts,
  postDeletion,
  userAccountDeletion,
  editUserDetails,
};
