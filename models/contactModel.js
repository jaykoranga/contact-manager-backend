const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"please enter the required name"],

    },
    email:{
        type:String,
        required:[true,"please enter the required email"],

    },
    phone:{
        type:String,
        required:[true,"please enter the required phone number"],

    }
},{Timestamps:true})

module.exports=mongoose.model("Contact",contactSchema)