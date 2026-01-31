const router = require("express").Router();
const upload = require("../middleware/multer.js");
const {
  getUserDetails,
  searchAccounts,
  searchAccountUser,
  getUserPosts,
  userPostCreation,
  incrementPostLike,
  getAllPosts,
  postDeletion,
  userAccountDeletion,
  editUserDetails,
  commentPost,
  getComments,
  deleteComment,
  followUser,
  storeMessages,
  getMessages,
} = require("../controllers/user.controller.js");

router.get("/:userId/homePage", getUserDetails);
router.get("/:userId/homePage/allPosts", getAllPosts);
router.get("/:userId/homePage/userProfile", getUserPosts);
router.get("/:userId/homePage/:postId/getComments", getComments);
router.get("/:userId/homePage/search", searchAccounts);
router.get("/:userId/homePage/:searchUserId", searchAccountUser);
router.get("/:userId/homePage/:searchUserId/message", getMessages);

router.post("/:userId/following/:searchUserId", followUser);
router.post(
  "/:userId/homePage/userProfile/postCreation",
  upload.single("postImage"),
  userPostCreation,
);
router.post("/:userId/homePage/userProfile/likePost", incrementPostLike);
router.post("/:userId/homePage/:postId/commentPost", commentPost);
router.post("/:userId/homePage/:searchUserId/message", storeMessages);
router.patch("/:userId/homePage/userSettings/editProfile", editUserDetails);
router.delete("/:userId/homePage/userProfile/postDeletion", postDeletion);
router.delete("/:userId/homePage/deleteComment", deleteComment);
router.delete(
  "/:userId/homePage/userSettings/accountDeletion",
  userAccountDeletion,
);
module.exports = router;
