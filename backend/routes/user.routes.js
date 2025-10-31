const router = require("express").Router();

const {
  getUserDetails,
  getUserPosts,
  userPostCreation,
} = require("../controllers/user.controller.js");

router.get("/:userId/homePage", getUserDetails);
router.get("/:userId/homePage/userProfile", getUserPosts);
router.post("/:userId/homePage/userProfile/postCreation", userPostCreation);

module.exports = router;
