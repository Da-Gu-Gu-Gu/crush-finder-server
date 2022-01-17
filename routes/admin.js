const express=require('express')
const router=express.Router()
const Admin=require('../models/admin')
const jwt=require('jsonwebtoken')
const adminMiddleware=require('../middleware/admin')
const User = require('../models/user')
const MatchUser=require('../models/matchusers')



router.post('/login',async(req,res)=>{
    try {
        const admin=await Admin.findOne({email:req.body.email})
        if(admin.password!==req.body.password) return res.json("Something Wrong")
        const token=jwt.sign({id:admin._id},
            process.env.JWT_SECRET
            )
        res.status(200).json(token)

    } catch (error) {
        console.log(error)
    }
})

router.get('/users',adminMiddleware,async(req,res)=>{
    try {
        const users=await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
})

router.get('/match',adminMiddleware,async(req,res)=>{
    try{
        const matchUsers=await MatchUser.find().populate('matchfrom').populate('matchto')
        res.status(200).json(matchUsers)
    }
     catch (error) {
        console.log(error)
    }
})



module.exports=router

