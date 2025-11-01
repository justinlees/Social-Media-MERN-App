const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { fullName, userName, dob, email, mobile } = req.body;

  try {
    const hashedPassword = req.body.password;
    const password = await bcrypt.hash(hashedPassword, 10);
    const findUser = await User.findOne({ userName });

    if (!findUser) {
      const newUser = await User.create({
        fullName,
        userName,
        dob,
        email,
        mobile,
        password,
      });

      const user = await User.findOne({ userName }).select("-password");
      return res.status(201).json({ user });
    }
    return res.status(404).json({ message: "User Already Exist" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const signIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const findUser = await User.findOne({ userName });
    if (!findUser) {
      return res.status(404).json({ message: "User not exist" });
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (checkPassword) {
      const user = await User.findOne({ userName }).select("-password");
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ message: "Password wrong" });
    }
  } catch (error) {
    console.error("Server Error", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { signUp, signIn };
