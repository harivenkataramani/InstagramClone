const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const authorization = require("../Middleware/requireLogin");

router.get("/allposts", authorization, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", authorization, (req, res) => {
  const { title, body, url } = req.body;
  if (!title || !body || !url) {
    return res.status(400).json({ error: "Please enter all the details" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: url,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({ post: result });
    })
    .catch((err) => console.log(err));
});

router.get("/myposts", authorization, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myposts) => {
      res.status(200).json({ myposts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like", authorization, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json({ result });
    }
  });
});

router.put("/unlike", authorization, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json({ result });
    }
  });
});

module.exports = router;
