const router = require("express").Router();
const User = require("../models/user.model.js");
const { signUp, signIn } = require("../controllers/auth.controller.js");

router.post("/signUp", signUp);
router.post("/signIn", signIn);

module.exports = router;
