const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "post added successfully",
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "iji683hiu",
      title: "first server-side post",
      content: "this is comming from the server",
    },
    {
      id: "lwc989zsu",
      title: "another server-side post",
      content: "this is another post from the server!",
    },
  ];
  return res.status(200).json({
    message: "posts fetched successfully!",
    posts: posts,
  });
});

module.exports = app;
