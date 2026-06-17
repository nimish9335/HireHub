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

        if(name.trim() === ""){
            return res.status(400).json({
                message:"Company name cannot be empty",
                success:false
            });
        }

        const existingCompany =
            await Company.findOne({
                name:name.trim()
            });

        if(existingCompany){
            return res.status(400).json({
                message:"Company already exists",
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
            message:error.message,
            success:false
        });
    }
}

const getCompany = async(req,res)=>{
    try{

        const keyword = req.query.keyword || "";

        const companies = await Company.find({
            userId:req.id,
            $or:[
                {
                    name:{
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
        });

        return res.status(200).json({
            companies,
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

const updateCompany = async(req,res)=>{
    try{

        const companyId = req.params.id;
        const updatedData = req.body;

        const company = await Company.findById(companyId);

        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            });
        }

        if(company.userId.toString() !== req.id){
            return res.status(403).json({
                message:"Unauthorized",
                success:false
            });
        }

        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            updatedData,
            {
                new:true
            }
        );

        return res.status(200).json({
            updatedCompany,
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

const deleteCompany = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            });
        }

        if(company.userId.toString() !== req.id){
            return res.status(403).json({
                message:"Unauthorized",
                success:false
            });
        }

        await Company.findByIdAndDelete(companyId);

        return res.status(200).json({
            message:"Company deleted successfully",
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
    registerCompany,
    getCompany,
    updateCompany,
    deleteCompany
};