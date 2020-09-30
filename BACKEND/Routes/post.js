const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const authorization = require("../Middleware/requireLogin");

router.get("/allposts", authorization, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
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
      $addToSet: { likes: req.user._id },
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

router.put("/comment", authorization, (req, res) => {
  let comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        res.json({ result });
      }
    });
});

router.delete("/deletePost/:postid", authorization, (req, res) => {
  Post.find({ _id: req.params.postid })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({ error: err });
      }
      if (post[0].postedBy._id.toString() === req.user._id.toString()) {
        post[0]
          .remove()
          .then((result) => {
            res.json({ result });
          })
          .catch((err) => {
            console.log("**error", err, "error**");
          });
      }
    });
});

router.get("/followingPosts", authorization, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
