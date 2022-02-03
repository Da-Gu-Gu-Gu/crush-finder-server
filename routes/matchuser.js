const express=require('express')
const router=express.Router()
const MatchUser=require('../models/matchusers')
const User=require('../models/user')
const facebookMiddleware=require('../middleware/facebookkuser')
const adminMiddleware=require('../middleware/admin')




//get single
router.post('/me',facebookMiddleware,async(req,res)=>{
    try{
        if(!req.accesstoken) return res.status(401).json("access denied")
        const me=await User.findOne({fbId:req.body.id})
        const mematchUser=await MatchUser.find({matchfrom:me._id}).populate('matchfrom').populate('matchto')
        res.status(200).json(mematchUser)
    }
    catch(err){console.log(err)}
})




module.exports=router