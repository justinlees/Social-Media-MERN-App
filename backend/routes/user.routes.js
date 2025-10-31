const router = require("express").Router();

const {
  getUserDetails,
  getUserPosts,
} = require("../controllers/user.controller.js");

router.get("/:userId/homePage", getUserDetails);
router.get(":userId/homePage/userProfile", getUserPosts);

module.exports = router;
