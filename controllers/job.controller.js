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

        if(
            !title ||
            !description ||
            !salary ||
            !location ||
            !company
        ){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        }

        if(salary <= 0){
            return res.status(400).json({
                message:"Salary must be greater than 0",
                success:false
            });
        }

        if(title.trim().length < 3){
            return res.status(400).json({
                message:"Title must be at least 3 characters",
                success:false
            });
        }

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
            message:error.message,
            success:false
        });
    }
}

const getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || "";
        const jobs = await Job.find({
            $or:[
                {
                    title:{
                        $regex:keyword,
                        $options:"i"
                    }
                },
                {
                    description:{
                        $regex:keyword,
                        $options:"i"
                    }
                }
            ]
        }).sort({createdAt:-1}).populate({
            path:"company"
        });

        return res.status(200).json({
            jobs,
            success:true
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            message:error.message,
            success:false
        });
    }
}

const getAdminJobs = async(req,res)=>{
    try{

        const jobs = await Job.find({
            createdBy:req.id
        }).sort({createdAt:-1}).populate({
            path:"company"
        });

        return res.status(200).json({
            jobs,
            success:true
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            message:error.message,
            success:false
        });
    }
}

module.exports = {
    postJob,
    getAllJobs,
    getAdminJobs
}