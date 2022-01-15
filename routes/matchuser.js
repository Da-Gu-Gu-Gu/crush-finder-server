const express=require('express')
const router=express.Router()
const MatchUser=require('../models/matchusers')
const User=require('../models/user')

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
router.get('/me',async(req,res)=>{
    try{
        const mematchUser=await MatchUser.findById(req.body.id)
        res.status(200).json(mematchUser)
    }
    catch(err){console.log(err)}
})

router.post('/',async(req,res)=>{
    try{
        const newMatchUser=await new MatchUser({
            matchfrom:req.body.matchfrom,  //need to change
            matchto:req.body.matchto
        }).save()

        res.status(200).json('successfully created')
    }
    catch(err){console.log(err)}
})


module.exports=router