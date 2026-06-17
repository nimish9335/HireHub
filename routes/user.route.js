const express = require("express");
const { register, login, getProfile, logout, updateProfile, uploadResumeTest, testCloudinary} = require("../controllers/user.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const singleUpload = require("../middleware/multer");

const router = express.Router();

router.get("/profile",isAuthenticated,getProfile);
router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout);
router.put("/profile/update",isAuthenticated,updateProfile);

module.exports = router;