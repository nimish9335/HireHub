const Application = require("../models/application.model");
const Job = require("../models/job.model");

const applyJob = async(req,res)=>{
    try{

        const applicantId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false
            });
        }

        const existingApplication =
        await Application.findOne({
            job:jobId,
            applicant:applicantId
        });

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied",
                success:false
            });
        }

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            });
        }

        await Application.create({
            job:jobId,
            applicant:applicantId
        });

        return res.status(201).json({
            message:"Applied successfully",
            success:true
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            message:error.message,
            success:false
        });
    }
};

const getAppliedJobs = async(req,res)=>{
    try{

        const applications =
        await Application.find({
            applicant:req.id
        })
        .populate({
            path:"job",
            populate:{
                path:"company"
            }
        });

        return res.status(200).json({
            applications,
            success:true
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false
        });
    }
};

const getApplicants = async(req,res)=>{
    try{

        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            });
        }

        if(job.createdBy.toString() !== req.id){
            return res.status(403).json({
                message:"Unauthorized",
                success:false
            });
        }

        const applicants =
        await Application.find({
            job:jobId
        })
        .populate("applicant");

        return res.status(200).json({
            applicants,
            success:true
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            message:error.message,
            success:false
        });
    }
};

const updateStatus = async(req,res)=>{
    try{

        const {status} = req.body;

        if(
            status !== "accepted" &&
            status !== "rejected"
        ){
            return res.status(400).json({
                message:"Invalid status",
                success:false
            });
        }

        const application =
        await Application.findById(req.params.id)
        .populate("job");

        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            });
        }

        if(application.job.createdBy.toString() !== req.id){
            return res.status(403).json({
                message:"Unauthorized",
                success:false
            });
        }

        application.status = status;

        await application.save();

        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            message:error.message,
            success:false
        });
    }
};

module.exports = {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
};