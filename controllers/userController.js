const asyncHandler = require('express-async-handler');
const User=require("../models/userModel")
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const dotenv=require("dotenv").config()
// @desc : register the user
// @route POST /api/user/register
// @access : public

const register = asyncHandler(async (req,res)=>{
    console.log(req.body);
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("feilds are empty");
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("user already exists");
    }
    //hashing
    const hashedPassword= await bcrypt.hash(password,10)
    console.log(`hashed password:`,hashedPassword);
    //user creation
    const user= await User.create({
        username,
        email,
        password:hashedPassword
    })
    console.log(`user created :${user}`)
    if(user){
        res.status(201).json({
            id:user.id,
            email:user.email
        })
    }
    else{
        res.status(400)
        throw new Error("user not created succesfully")
    }

    
})

// @desc : login the user
// @route POST /api/user/login
// @access : public
const login = asyncHandler(async (req,res)=>{
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(!email || !password){
        res.status(400)
        throw new Error("all feilds are mandatory")
    }
    console.log(user)
    if(!user){
        res.status(400)
        throw new Error("email or password is wrong")
    }
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken= jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
           
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1h"})
        res.json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("wrong email or password")
    }
    
})

// @desc : current user info
// @route GET /api/user/current
// @access : private
const current = asyncHandler(async (req,res)=>{
    res.json({message:`current user:
        `,
    user:req.user})
})


module.exports={register,login,current}