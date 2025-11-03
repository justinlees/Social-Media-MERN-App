const router = require("express").Router();

const {
  getUserDetails,
  getUserPosts,
  userPostCreation,
  incrementPostLike,
  getAllPosts,
  postDeletion,
} = require("../controllers/user.controller.js");

router.get("/:userId/homePage", getUserDetails);
router.get("/:userId/homePage/allPosts", getAllPosts);
router.get("/:userId/homePage/userProfile", getUserPosts);
router.post("/:userId/homePage/userProfile/postCreation", userPostCreation);
router.post("/:userId/homePage/userProfile/likePost", incrementPostLike);
router.delete("/:userId/homePage/userProfile/postDeletion", postDeletion);

module.exports = router;
