const User = require("../models/User");
const ResetPassword = require("../models/ResetPassword");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const add_user = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ message: "Please enter email and password!" });
    } else {
      const hashed_password = await bcrypt.hash(req.body.password, 10);
      const user_data = {
        email: req.body.email,
        password: hashed_password,
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

const reset_password = async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400).json({ message: "Please enter an email" });
    } else {
      // CHECKING IF THIS USER EXIST OR NOT
      const goal_email = req.body.email;
      const user_found = await User.findOne({ email: goal_email });
      if (!user_found) {
        res.status(400).json({
          message: "User with this email not exist, please Sign Up...",
        });
      } else {
        //MAKE A RANDOM TOKEN
        function randomString(len) {
          let p = "ABCVHDJSKDSFHSFHHSJJaklsvhfdvndjnvdfk03824778647";
          return [...Array(len)].reduce(
            (a) => a + p[~~(Math.random() * p.length)],
            ""
          );
        }
        const reset_password_token = randomString(60);
        //MAKE RESET PASSWORD
        const reset_password_data = {
          email: goal_email,
          token: reset_password_token,
        };
        await ResetPassword(reset_password_data);

        //EMAIL TO USER
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.reset_password = reset_password;
