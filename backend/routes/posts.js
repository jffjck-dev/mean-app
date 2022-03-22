const express = require("express");
const PostModel = require("../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "post added successfully",
      postId: createdPost._id,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new PostModel({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  });
  PostModel.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: "update successful!" });
  });
});

router.get("", (req, res, next) => {
  PostModel.find().then((documents) => {
    res.status(200).json({
      message: "posts fetched successfully!",
      posts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  PostModel.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  PostModel.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
  });
  res.status(200).json({ message: "Post deleted!" });
});

module.exports = router;