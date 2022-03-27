const express = require("express");
const router = express.Router();

AuthController = require("../controllers/auth");

router.post("/signup", AuthController.createUser);

router.post("/login", AuthController.userLogin);

module.exports = router;
