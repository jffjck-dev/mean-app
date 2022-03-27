const express = require("express");
const PostController = require("../controllers/posts");

const extractFile = require("../middlewares/file");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.post("", checkAuth, extractFile, PostController.createPost);

router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.get("", PostController.getAllPosts);

router.get("/:id", PostController.getOnePost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
