const router = require("express").Router();

const {
  getUserDetails,
  getUserPosts,
  userPostCreation,
  incrementPostLike,
  getAllPosts,
} = require("../controllers/user.controller.js");

router.get("/:userId/homePage", getUserDetails);
router.get("/:userId/homePage/allPosts", getAllPosts);
router.get("/:userId/homePage/userProfile", getUserPosts);
router.post("/:userId/homePage/userProfile/postCreation", userPostCreation);
router.post("/:userId/homePage/userProfile/likePost", incrementPostLike);

module.exports = router;
