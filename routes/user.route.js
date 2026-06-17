const express = require("express");

const {
    register,
    login,
    getProfile,
    logout,
    updateProfile
} = require("../controllers/user.controller");

const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", isAuthenticated, getProfile);

router.put("/profile/update", isAuthenticated, updateProfile);

router.get("/logout", logout);

module.exports = router;