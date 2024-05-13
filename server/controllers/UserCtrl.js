const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const add_user = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ message: "Please enter email and password!" });
    } else {
      const user_data = {
        email: req.body.email,
        password: rea.body.password,
      };
      await User.create(user_data);
      res.status(200).json({ message: "user created successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.add_user = add_user;
