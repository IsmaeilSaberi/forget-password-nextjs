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
        await ResetPassword.create(reset_password_data);

        //EMAIL TO USER
        const goal_link = `http://localhost:3000/new-password/${reset_password_token}`;

        const MAIL_HOST = process.env.MAIL_HOST;
        const MAIL_PORT = process.env.MAIL_PORT;
        const MAIL_USER = process.env.MAIL_USER;
        const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
        const MAIL_MAIN_ADDRESS = process.env.MAIL_MAIN_ADDRESS;

        const transporter = nodemailer.createTransport({
          host: MAIL_HOST,
          port: MAIL_PORT,
          tls: true,
          auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD,
          },
        });
        transporter
          .sendMail({
            from: MAIL_MAIN_ADDRESS,
            to: goal_email,
            subject: "reset password",
            html: `<html><head><style>strong{color: rgb(0, 119, 255);}h1{font-size: large;}</style></head><body><h1>Reset Password Email from Reset PASSWORD project</h1><br /> <a target="_blank" href=${goal_link} style="margin-bottom: 40px;"> <span style=" background-color:#fff700; padding: .5rem; text-align: center;border-radius: .4rem; line-height: 2rem; font-family:tahoma,arial,helvetica,sans-serif"> ${goal_link} </span> </a> <br /><div></div></body></html>`,
          })
          .then((d) =>
            res
              .status(200)
              .json({ message: "You have 2 min for checking your email..." })
          )
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "Error in sending email..." });
          });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.reset_password = reset_password;

const new_password = async (req, res) => {
  try {
    if (!req.body.password || !req.body.repassword || !req.body.token) {
      res.status(400).json({
        message: "Please enter password, repassword and token completely ...",
      });
    } else {
      if (req.body.password != req.body.repassword) {
        res.status(400).json({ message: "Confirm password is wrong ..." });
      } else {
        const goal_token = req.body.token;
        const found_reset_password = await ResetPassword.findOne({
          token: goal_token,
        });
        if (!found_reset_password) {
          res.status(400).json({ message: "Your token is expired!" });
        } else {
          // FIND USER
          const goal_email = found_reset_password.email;
          const found_user = await User.findOne({ email: goal_email });

          if (!found_user) {
            res.status(400).json({ message: "User not found!" });
          } else {
            // CHANGE PASSWORD
            const hashed_new_password = await bcrypt.hash(
              req.body.password,
              10
            );
            const user_new_data = {
              password: hashed_new_password,
            };
            await User.findByIdAndUpdate(found_user._id, user_new_data, {
              new: true,
            });
            res
              .status(200)
              .json({ message: "Your password changed successfully!" });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "An error accured!" });
  }
};
module.exports.new_password = new_password;
