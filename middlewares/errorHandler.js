const {constants}=require("../constants")
const errorHandler=(err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({title:"validation failed",message:err.message,stackTrace:err.stack})
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({title:"not found",message:err.message,stackTrace:err.stack})
            break
        
        case constants.FORBIDDEN:
            res.status(statusCode).json({title:"forbidden error",message:err.message,stackTrace:err.stack}) 
            break;
           
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({title:"unauthorized",message:err.message,stackTrace:err.stack})
            break;
        
        case constants.SERVER_ERROR:
            res.status(statusCode).json({title:"server error",message:err.message,stackTrace:err.stack})

    }
    
}
module.exports=errorHandler;