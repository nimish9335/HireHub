const express = require("express");
const { register, login, getProfile, logout } = require("../controllers/user.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/profile",isAuthenticated,getProfile);
router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout);

module.exports = router;