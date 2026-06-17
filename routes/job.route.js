const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");

const {
    postJob,
    getAllJobs,
    getAdminJobs,
    deleteJob
} = require("../controllers/job.controller");

const router = express.Router();

router.post("/post", isAuthenticated, postJob);

router.get("/get", getAllJobs);

router.get("/getadminjobs", isAuthenticated, getAdminJobs);

router.delete("/delete/:id", isAuthenticated, deleteJob);

module.exports = router;