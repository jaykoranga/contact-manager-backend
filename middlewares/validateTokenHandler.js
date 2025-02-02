const asyncHandler=require('express-async-handler')
const jwt=require("jsonwebtoken")
const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.authorization || req.headers.Authorization 
    if(authHeader && authHeader.startsWith('Bearer')){
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
            if(err){
                res.status(401)
                throw new Error("user is not authorized")
            }
            
            req.user=decode.user
            if(!token){
                res.status(401)
                throw new Error("token is not present or user is not authorized.")
            }

        })
    }
    next();
})
module.exports=validateToken