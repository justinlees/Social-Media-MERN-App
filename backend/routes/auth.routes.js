const router = require("express").Router();
const User = require("../models/user.model.js");
const { signUp } = require("../controllers/auth.controller.js");

router.post("/signUp", signUp);

module.exports = router;
