import jwt from "jsonwebtoken"
import User from "../model/user.model.js";
export const protectedRoute=async(req, res,next)=>{
    try{
    const token = req.cookies?.jwt;

    if(!token){
        return res.status(500).json({message:"Unauthorized - No Token Provided"});

    }
    const iscorrect=jwt.verify(token,process.env.JWTSECRET);

    if (!iscorrect){
        return res.status(401).json({message:"Unauthorized - Invalid Token"})
    }
    const feuser =await  User.findById(iscorrect.userId).select("-password");
    
    req.user = feuser;
    next();
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"internal server error"});
    }
}