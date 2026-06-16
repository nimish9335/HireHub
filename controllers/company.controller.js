const Company = require("../models/company.model");

const registerCompany = async(req,res)=>{
    try{

        const {name} = req.body;

        if(!name){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            });
        }

        const company = await Company.create({
            name,
            userId:req.id
        });

        return res.status(201).json({
            message:"Company created successfully",
            company,
            success:true
        });

    }catch(error){
        console.log(error);

        return res.status(500).json({
            message:"Internal Server Error",
            success:false
        });
    }
}

const getCompany = async(req,res)=>{
    try{

        const companies = await Company.find({
            userId:req.id
        });

        return res.status(200).json({
            companies,
            success:true
        });

    }catch(error){
        return res.status(500).json({
            success:false
        });
    }
}

const updateCompany = async(req,res)=>{
    try{

        const companyId = req.params.id;

        const updatedData = req.body;

        const company = await Company.findByIdAndUpdate(
            companyId,
            updatedData,
            {
                new:true
            }
        );

        return res.status(200).json({
            company,
            success:true
        });

    }catch(error){
        return res.status(500).json({
            success:false
        });
    }
}

module.exports = {
    registerCompany,
    getCompany,
    updateCompany
};