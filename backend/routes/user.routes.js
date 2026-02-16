const router = require("express").Router();
const upload = require("../middleware/multer.js");
const protectAuth = require("../middleware/auth.middleware.js");
const {
  getUserDetails,
  searchAccounts,
  searchAccountUser,
  getUserPosts,
  getNotifications,
  userPostCreation,
  incrementPostLike,
  getAllPosts,
  postDeletion,
  userAccountDeletion,
  editUserDetails,
  followRequest,
  commentPost,
  getComments,
  deleteComment,
  followUser,
  storeMessages,
  getMessages,
} = require("../controllers/user.controller.js");

router.get("/homePage", protectAuth, getUserDetails);
router.get("/homePage/allPosts", protectAuth, getAllPosts);
router.get("/homePage/userProfile", protectAuth, getUserPosts);
router.get("/homePage/:postId/getComments", protectAuth, getComments);
router.get("/homePage/search", protectAuth, searchAccounts);
router.get("/homePage/:searchUserId", protectAuth, searchAccountUser);
router.get("/homePage/:searchUserId/message", protectAuth, getMessages);
router.get(
  "/homePage/userProfile/notifications",
  protectAuth,
  getNotifications,
);

router.post("/following/:searchUserId", protectAuth, followUser);
router.post("/followRequest/:searchUserId", protectAuth, followRequest);
router.post(
  "/homePage/userProfile/postCreation",
  protectAuth,
  upload.single("postImage"),
  userPostCreation,
);
router.post("/homePage/userProfile/likePost", protectAuth, incrementPostLike);
router.post("/homePage/:postId/commentPost", protectAuth, commentPost);
router.post("/homePage/:searchUserId/message", protectAuth, storeMessages);
router.patch(
  "/homePage/userSettings/editProfile",
  protectAuth,
  editUserDetails,
);
router.delete("/homePage/userProfile/postDeletion", protectAuth, postDeletion);
router.delete("/homePage/deleteComment", protectAuth, deleteComment);
router.delete(
  "/homePage/userSettings/accountDeletion",
  protectAuth,
  userAccountDeletion,
);
module.exports = router;
