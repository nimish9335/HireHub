const Job = require("../models/job.model");

const postJob = async(req,res)=>{
    try{

        const {
            title,
            description,
            salary,
            location,
            company
        } = req.body;

        const job = await Job.create({
            title,
            description,
            salary,
            location,
            company,
            createdBy:req.id
        });

        return res.status(201).json({
            success:true,
            job
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false
        });
    }
}

const getAllJobs = async(req,res)=>{
    try{

        const jobs = await Job.find()
        .populate("company");

        return res.status(200).json({
            jobs,
            success:true
        });

    }catch(error){
        return res.status(500).json({
            success:false
        });
    }
}

const getAdminJobs = async(req,res)=>{
    try{

        const jobs = await Job.find({
            createdBy:req.id
        });

        return res.status(200).json({
            jobs,
            success:true
        });

    }catch(error){
        return res.status(500).json({
            success:false
        });
    }
}

module.exports = {
    postJob,
    getAllJobs,
    getAdminJobs
}