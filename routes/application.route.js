const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");

const {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
} = require("../controllers/application.controller");

const router = express.Router();

router.post("/apply/:id", isAuthenticated, applyJob);

router.get("/get", isAuthenticated, getAppliedJobs);

router.get("/applicants/:id", isAuthenticated, getApplicants);

router.put("/status/:id/update", isAuthenticated, updateStatus);

module.exports = router;