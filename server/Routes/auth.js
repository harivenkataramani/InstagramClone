const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { JWT_SECRET, SENDGRID_API, EMAIL_URL } = require("../Config/keys");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
);

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all the details" });
  }
  User.findOne({ email: email })
    .then((userDetails) => {
      if (userDetails) {
        return res.status(400).json({ error: "User already exists" });
      }
      bcrypt.hash(password, 12).then((hashedpass) => {
        const user = new User({
          email,
          name,
          password: hashedpass,
          pic,
        });
        user
          .save()
          .then((user) => {
            transporter.sendMail({
              to: user.email,
              from: "hari.venkataramani18@gmail.com",
              subject: "Sign-Up Successfull",
              html: "<h1>Welcome to InstaGram</h1>",
            });
            res
              .status(201)
              .json({ message: "User has been successfully registered" });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Please enter all the details" });
  }
  User.findOne({ email: email })
    .then((userDetails) => {
      if (!userDetails) {
        return res.status(400).json({ error: "Invalid Email or Password" });
      }
      bcrypt.compare(password, userDetails.password).then((isUser) => {
        if (isUser) {
          const token = jwt.sign({ _id: userDetails._id }, JWT_SECRET);
          const { _id, name, email, followers, following, pic } = userDetails;
          res.status(200).json({
            token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          return res.status(400).json({ error: "Invalid Email or Password" });
        }
      });
    })
    .catch((err) => console.log(err));
});

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ error: "User id is not avalable. Please Register" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user
        .save()
        .then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "venkata.hari18@gmail.com",
            subject: "Password Reset Request",
            html: `
          <p>Reset Password</p>
          <h5>Click this <a href="${EMAIL_URL}/resetpassword/${token}">link</a> to reset your password</h5>
          `,
          });
          res.status(200).json({
            message: "Please check your email to reset password",
          });
        })
        .catch((err) => console.log(err));
    });
  });
});

router.post("/newpassword", (req, res) => {
  const { password, resetPassToken } = req.body;
  User.findOne({
    resetToken: resetPassToken,
    expireToken: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "Your Password Session Reset Link Expired! Please Try again",
        });
      }
      bcrypt.hash(password, 12).then((hashedpass) => {
        user.password = hashedpass;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((savedUser) => {
          res.status(200).json({
            message: "New Password has been Updated",
          });
        });
      });
    })
    .catch((err) => console.log(err));
});
module.exports = router;
