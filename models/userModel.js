const mongoose = require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"please enter the username"]
    },

    email:{
        type:String,
        required:[true,"please add an email"],
        unique:[true,"email already exists"]
    },
    password:{
        

    }
    

},{Timestamp:true})
module.exports=mongoose.model('User',userSchema);