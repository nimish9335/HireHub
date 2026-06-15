const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,password,role} = req.body;

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                message:"User already exists",
                success:false
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role
        });

        return res.status(201).json({
            message:"Account created successfully",
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

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"Incorrect password",
                success:false
            });
        }

        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRE
            }
        );

        const safeUser = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role,
            phoneNumber:user.phoneNumber
        };

        return res.cookie("token",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict"
        })
        .status(200)
        .json({
            message:`Welcome back ${user.fullname}`,
            success:true,
            user:safeUser
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false
        });
    }
}

const getProfile = async(req,res)=>{
    try{
        const userId = req.id;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            });
        }

        return res.status(200).json({
            success:true,
            user
        });
    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error",
            success:false
        });
    }
}

const logout = async(req,res)=>{
    try{
        return res.cookie(
            "token",
            "",
            {
                maxAge:0
            }
        ).status(200).json({
            message:"Logged out successfully",
            success:true
        });

    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error",
            success:false
        });
    }
}

module.exports = {
    register,
    login,
    getProfile,
    logout
};