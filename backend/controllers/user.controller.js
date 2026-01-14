const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");
const Comment = require("../models/postComments.model.js");
const Following = require("../models/following.model.js");
const Followers = require("../models/followers.model.js");

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

//SEARCH USER ACCOUNTS
const searchAccounts = async (req, res) => {
  const searchTerm = req.query.account || "";
  try {
    if (searchTerm) {
      const accounts = await User.find({
        $or: [
          { userName: { $regex: `${searchTerm}` } },
          { fullName: { $regex: `${searchTerm}` } },
        ],
      }).select("-password");
      if (accounts.length) return res.status(200).json({ accounts });
    }
    return res.status(200).json({ message: "Search Accounts" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//GET SEARCH ACCOUNT POSTS
const searchAccountUser = async (req, res) => {
  const { searchUserId } = req.params;
  try {
    const searchUserPosts = await Post.find({ userId: searchUserId });
    const searchUser = await User.findOne({ _id: searchUserId }).select(
      "-password"
    );
    const searchUserFollowers = await Followers.find({
      userId: searchUserId,
    });
    const searchUserFollowings = await Following.find({
      followingId: searchUserId,
    });
    if (searchUserPosts.length || searchUser)
      return res.status(200).json({
        searchUserPosts,
        searchUser,
        searchUserFollowers,
        searchUserFollowings,
      });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
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

//FOLLOWING A USER
const followUser = async (req, res) => {
  const { userId, followingId, followingUsername } = req.body;
  try {
    const getUserName = await User.findOne({ _id: userId });

    const followingExist = await Following.findOne({ userId, followingId });
    if (!followingExist) {
      const followingUser = await Following.create({
        userId,
        followingId,
        followingUsername,
      });
      const followedUser = await Followers.create({
        userId: followingId,
        followerId: userId,
        followerUsername: getUserName.userName,
      });
      const incrementFollowingUser = await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { following: 1 } }
      );
      const incrementFollowedUser = await User.findOneAndUpdate(
        { _id: followingId },
        { $inc: { followers: 1 } }
      );
      if (incrementFollowedUser) {
        return res.status(200).json({ message: "increment success" });
      }
    } else {
      const followingUser = await Following.deleteOne({
        userId,
        followingId,
        followingUsername,
      });
      const followedUser = await Followers.deleteOne({
        userId: followingId,
        followerId: userId,
        followerUsername: getUserName.userName,
      });
      const decrementFollowingUser = await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { following: -1 } }
      );
      const decrementFollowedUser = await User.findOneAndUpdate(
        { _id: followingId },
        { $inc: { followers: -1 } }
      );
      if (decrementFollowedUser) {
        return res.status(200).json({ message: "decrement success" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
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

// GET POST COMMENTS
const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId });
    if (comments) return res.status(200).json({ comments });
    return res.status(404);
  } catch (error) {
    console.error("Server Error: ", error);
    return res.status(500);
  }
};

// COMMENTING POST
const commentPost = async (req, res) => {
  const { postId, userName, text } = req.body;
  try {
    const comment = await Comment.create({ postId, userName, text });
    if (comment) {
      const incrementCommentCount = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { comments: 1 } }
      );
      return res.status(201).json({ message: "Comment Created Successfully" });
    }
    return res.status(404);
  } catch (error) {
    console.error("Server Error :", error);
    return res.status(500);
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

// DELETE POST COMMENT
const deleteComment = async (req, res) => {
  const { _id, postId } = req.body;
  try {
    const commentDeletion = await Comment.findOneAndDelete({ _id });
    if (commentDeletion) {
      const decrementCommentCount = await Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { comments: -1 } }
      );
      return res.status(200).json({ message: "Comment Deleted" });
    }

    return res.status(404).json({ message: "Unable to delete comment" });
  } catch (error) {
    console.error("Error Occured: ", error);
    return res.status(500).json("Server Error");
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
  searchAccounts,
  searchAccountUser,
  getUserPosts,
  userPostCreation,
  incrementPostLike,
  followUser,
  getAllPosts,
  postDeletion,
  userAccountDeletion,
  editUserDetails,
  commentPost,
  getComments,
  deleteComment,
};
