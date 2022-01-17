const express=require('express')
const router=express.Router()
const MatchUser=require('../models/matchusers')
const User=require('../models/user')
const facebookMiddleware=require('../middleware/facebookkuser')
const facebookkuser = require('../middleware/facebookkuser')

router.get('/',async(req,res)=>{
    try{
        const matchUser=await MatchUser.find()
        res.status(200).json(matchUser)
    }
     catch (error) {
        console.log(error)
    }
})

//get single
router.get('/me',facebookMiddleware,async(req,res)=>{
    try{
        if(!req.accesstoken) return res.status(401).json("access denied")
        const mematchUser=await MatchUser.findOne({matchfrom:req.body.id}).all()
        res.status(200).json(mematchUser)
    }
    catch(err){console.log(err)}
})




module.exports=router