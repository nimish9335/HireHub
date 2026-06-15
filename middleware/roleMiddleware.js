const isRecruiter = (req,res,next)=>{
    if(req.user.role !== "recruiter"){
        return res.status(403).json({
            message:"Access denied"
        });
    }

    next();
}

const isAdmin = (req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({
            message:"Access denied"
        });
    }

    next();
}

module.exports = {
    isRecruiter,
    isAdmin
}