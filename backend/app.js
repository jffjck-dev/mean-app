const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PostModel = require("./models/post");

const app = express();

mongoose
  .connect(
    "mongodb+srv://mdbAdmin:HgpVLdGCCt6X3dRc@cluster0.71cwb.mongodb.net/mean-app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongoDB connected!");
  })
  .catch(() => {
    console.log("connection failed!");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
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

app.get("/api/posts", (req, res, next) => {
  PostModel.find().then((documents) => {
    res.status(200).json({
      message: "posts fetched successfully!",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  PostModel.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
  });
  res.status(200).json({ message: "Post deleted!" });
});

module.exports = app;
