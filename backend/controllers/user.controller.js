const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");
const Comment = require("../models/postComments.model.js");
const Following = require("../models/following.model.js");
const Followers = require("../models/followers.model.js");
const Message = require("../models/message.model.js");
const cloudinary = require("../lib/cloudinarySetup.js");
const FollowRequest = require("../models/followRequest.model.js");
const Connection = require("../models/connection.model.js");

// GET USER DETAILS
const getUserDetails = async (req, res) => {
  const userId = req.userId;
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
  const userId = req.userId;
  try {
    const searchUserPosts = await Post.find({ userId: searchUserId });
    const searchUser = await User.findOne({ _id: searchUserId }).select(
      "-password",
    );
    const searchUserFollowers = await Followers.find({
      userId: searchUserId,
    });
    const searchUserFollowings = await Following.find({
      userId: searchUserId,
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
  const userId = req.userId;
  try {
    const posts = await Post.find({ userId });
    return res.status(200).json({ posts });
  } catch (error) {
    console.log("Error Occured", error);
    return res.status(500).json({ message: "Server Error Occured" });
  }
};

//GET USER NOTIFICATIONS
const getNotifications = async (req, res) => {
  const userId = req.userId;
  try {
    const getRequests = await FollowRequest.find({ followingId: userId });
    return res.status(200).json({ getRequests });
  } catch (error) {
    console.log("Error Occured", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// CREATING USER'S POST
const userPostCreation = async (req, res) => {
  const userId = req.userId;
  const { postCaption, userName } = req.body;
  const postImage = req.file.path;
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: "auto",
      asset_folder: "socialMediaPosts",
    };

    const result = await cloudinary.uploader.upload(postImage, options);

    const createPost = await Post.create({
      userId,
      postImage: result.secure_url,
      postCaption,
      userName,
    });
    if (createPost) {
      return res.status(201).json({ createPost });
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
        { $inc: { likes: 1 }, $push: { likedBy: userId } },
      );
      if (incrementLike) {
        return res.status(200).json({ message: "Liked the post" });
      }
      return res.status(404).json({ message: "Not liked the post" });
    } else {
      const decrementLike = await Post.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 }, $pull: { likedBy: userId } },
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
// const followUser = async (req, res) => {
//   const { userId, userName, followingId, followingUsername } = req.body;
//   try {
//     const getUserName = await User.findOne({ _id: userId });

//     const followingExist = await Following.findOne({ userId, followingId });
//     if (!followingExist) {
//       const followUser = await Following.create({
//         userId,
//         userName,
//         followingId,
//         followingUsername,
//       });
//       const followedUser = await Followers.create({
//         userId: followingId,
//         userName: followingUsername,
//         followerId: userId,
//         followerUsername: getUserName.userName,
//       });
//       const incrementFollowingUser = await User.findOneAndUpdate(
//         { _id: userId },
//         { $inc: { following: 1 } },
//       );
//       const incrementFollowedUser = await User.findOneAndUpdate(
//         { _id: followingId },
//         { $inc: { followers: 1 } },
//       );
//       const removeFollowRequest = await FollowRequest.deleteOne({
//         userId,
//         userName,
//         followingId,
//         followingUsername,
//       });
//       if (removeFollowRequest) {
//         return res.status(200).json({ message: "following success" });
//       }
//     } else {
//       const followingUser = await Following.deleteOne({
//         userId,
//         userName,
//         followingId,
//         followingUsername,
//       });
//       const followedUser = await Followers.deleteOne({
//         userId: followingId,
//         userName: followingUsername,
//         followerId: userId,
//         followerUsername: getUserName.userName,
//       });
//       const decrementFollowingUser = await User.findOneAndUpdate(
//         { _id: userId },
//         { $inc: { following: -1 } },
//       );
//       const decrementFollowedUser = await User.findOneAndUpdate(
//         { _id: followingId },
//         { $inc: { followers: -1 } },
//       );
//       if (decrementFollowedUser) {
//         return res.status(200).json({ message: "decrement success" });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error", error });
//   }
// };

//FOLLOW USER

const followUser = async (req, res) => {
  const currentUserId = req.userId;
  const { targetUserId } = req.params;

  try {
    const connectionExist = await Connection.findOne({
      followerId: currentUserId,
      followingId: targetUserId,
    });
    const checkAccountPrivacy = await User.findById(targetUserId);
    const userPrivacy =
      checkAccountPrivacy.accountType === "public" ? "accepted" : "pending";
    if (!connectionExist) {
      await Connection.create({
        followerId: currentUserId,
        followingId: targetUserId,
        connectionStatus: userPrivacy,
      });

      const userFollowers = await Connection.find({
        followingId: targetUserId,
      }).populate("followerId", "userName profileImage");

      const userFollowings = await Connection.find({
        followerId: targetUserId,
      }).populate("followingId", "userName profileImage");

      return res.status(201).json({
        userFollowers,
        userFollowings,
        message: "Connection Successful",
      });
    } else {
      await Connection.deleteOne({
        followerId: currentUserId,
        followingId: targetUserId,
      });
      return res
        .status(200)
        .json({ message: "Connection Deleted Successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

//FollowRequest
const followRequest = async (req, res) => {
  const { userId, userName, followingId, followingUsername } = req.body;
  try {
    const createFollowRequest = await FollowRequest.create({
      userId,
      userName,
      followingId,
      followingUsername,
    });
    return res.status(201).json({ message: "created request" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
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
        { $inc: { comments: 1 } },
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
  const userId = req.userId;
  try {
    const editUser = await User.findOneAndUpdate(
      { _id: userId },
      { fullName, dob, mobile, email, accountType, bioData },
    );
    if (editUser) return res.status(200);
    return res.status(404);
  } catch (error) {
    console.error("Error occured: ", error);
    return res.status(500).json({ message: error });
  }
};

//GET MESSAGES
const getMessages = async (req, res) => {
  const { searchUserId } = req.params;
  const userId = req.userId;
  try {
    const msg = await Message.find({
      senderId: { $in: [userId, searchUserId] },
      receiverId: { $in: [userId, searchUserId] },
    });
    if (msg) return res.status(200).json({ msg });
    else return res.status(204).json({ message: "No msgs" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//STORE MESSAGES
const storeMessages = async (req, res) => {
  const { searchUserId } = req.params;
  const userId = req.userId;
  const { file, text } = req.body;
  try {
    const createMsg = await Message.create({
      senderId: userId,
      receiverId: searchUserId,
      text: text,
      file: file,
    });
    if (createMsg) return res.status(201).json({ message: "message Stored" });
    else return res.status(404).json({ message: "message Failed to store" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
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
        { $inc: { comments: -1 } },
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
  const userId = req.userId;
  try {
    const deleteUser = await User.findOneAndDelete({ _id: userId });
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
  getNotifications,
  userPostCreation,
  incrementPostLike,
  followUser,
  getAllPosts,
  postDeletion,
  userAccountDeletion,
  editUserDetails,
  followRequest,
  commentPost,
  getComments,
  deleteComment,
  storeMessages,
  getMessages,
};
