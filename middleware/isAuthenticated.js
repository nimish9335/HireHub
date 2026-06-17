const jwt = require("jsonwebtoken");

const isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        req.id = decoded.userId;
        next();

    }catch(error){
        return res.status(401).json({
            message:"Invalid Token",
            success:false
        });
    }
}

module.exports = isAuthenticated;