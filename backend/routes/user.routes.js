const router = require("express").Router();

const {
  getUserDetails,
  getUserPosts,
  userPostCreation,
  incrementPostLike,
  getAllPosts,
  postDeletion,
  userAccountDeletion,
  editUserDetails,
  commentPost,
  getComments,
} = require("../controllers/user.controller.js");

router.get("/:userId/homePage", getUserDetails);
router.get("/:userId/homePage/allPosts", getAllPosts);
router.get("/:userId/homePage/userProfile", getUserPosts);
router.get("/:userId/homePage/:postId/getComments", getComments);
router.post("/:userId/homePage/userProfile/postCreation", userPostCreation);
router.post("/:userId/homePage/userProfile/likePost", incrementPostLike);
router.post("/:userId/homePage/:postId/commentPost", commentPost);
router.patch("/:userId/homePage/userSettings/editProfile", editUserDetails);
router.delete("/:userId/homePage/userProfile/postDeletion", postDeletion);
router.delete(
  "/:userId/homePage/userSettings/accountDeletion",
  userAccountDeletion
);
module.exports = router;
