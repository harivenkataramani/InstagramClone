const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { JWT_SECRET } = require("../keys");
const authorization = require("../Middleware/requireLogin");

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
          res
            .status(200)
            .json({
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
module.exports = router;
