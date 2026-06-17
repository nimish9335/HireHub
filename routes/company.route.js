const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");

const {
    registerCompany,
    getCompany,
    updateCompany,
    deleteCompany
} = require("../controllers/company.controller");

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);

router.get("/get", isAuthenticated, getCompany);

router.put("/update/:id", isAuthenticated, updateCompany);

router.delete("/delete/:id", isAuthenticated, deleteCompany);

module.exports = router;