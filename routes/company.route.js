const express = require("express");
const isAuthenticated =require("../middleware/isAuthenticated");
const {registerCompany,getCompany,updateCompany} = require("../controllers/company.controller");

const router = express.Router();

router.post("/register",isAuthenticated,registerCompany);

router.get("/get",isAuthenticated,getCompany);

router.put("/update/:id",isAuthenticated,updateCompany);

module.exports = router;