const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

router.get("/signUp", async (req, res) => {
  const { fullName, userName, dob, email, mobile } = req.body;
  const hashedPassword = req.body.password;
  const password = await bcrypt.hash(hashedPassword, 10);
  const findUser = await User.find({ userName });
  if (!findUser) {
    const newUser = await User.create({
      fullName,
      userName,
      dob,
      email,
      mobile,
      password,
    });
  }
});
