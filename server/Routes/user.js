const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const authorization = require("../Middleware/requireLogin");

router.get("/user/:id", authorization, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, post) => {
          if (err) {
            return res.status(400).json({ error: err });
          }
          res.json({ user, post });
        });
    })
    .catch((err) => {
      return res.status(400).json({ error: "No user found" });
    });
});

router.put("/follow", authorization, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $addToSet: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { following: req.body.followId } },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json({ result });
        })
        .catch((err) => {
          return res.status(400).json({ error: err });
        });
    }
  );
});

router.put("/unfollow", authorization, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.body.unfollowId } },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json({ result });
        })
        .catch((err) => {
          return res.status(400).json({ error: err });
        });
    }
  );
});

router.put("/updatePic", authorization, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: "pic cannot be updated" });
      }
      res.json(result);
    }
  );
});

router.post("/search-users", (req, res) => {
  let userPattern = new RegExp("^" + req.body.query);
  User.find({ email: { $regex: userPattern } })
    .select("_id email")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

module.exports = router;
