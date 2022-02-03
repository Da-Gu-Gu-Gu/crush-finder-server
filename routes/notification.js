const express=require('express')
const router=express.Router()
const Notification=require('../models/notification')
const User=require('../models/user')
const facebookMiddleware = require('../middleware/facebookkuser')


router.post('/',facebookMiddleware,async(req,res)=>{
    try {
        const me=await User.findOne({fbId:req.body.id})
        const crush=await User.findOne({fbId:req.body.crushId})
        const notiOne=await Notification({
            youId:me._id,
            crushId:crush._id,
            
        }).save()
        const notiTwo=await Notification({
            youId:crush._id,
            crushId:me._id,
        }).save()

        res.status(200).json('success')

    } catch (error) {
        console.log(error)
    }
})


router.post('/me',facebookMiddleware,async(req,res)=>{
    try {
        const me=await User.findOne({fbId:req.body.id})
        console.log(req.body.id)
        console.log(me)
        const myNoti=await Notification.find({youId:me._id}).populate('youId').populate('crushId')
        res.status(200).json(myNoti)
    } catch (error) {
        console.log(error)
    }
})

router.put('/',facebookMiddleware,async(req,res)=>{

    //id ka _id noti table yae
    try{
        const updateNoti=await Notification.findByIdAndUpdate(req.body.id,{
            read:true
        },{
            new:true
        })

        res.status(200).json('read')
    }
    catch(err){
        console.log(err)
    }
})

router.delete('/',facebookMiddleware,async(req,res)=>{
    try{
        const deleteNoti=await Notification.findByIdAndRemove(req.body.id)
        res.status(200).json('delete successfully')
    }
    catch(err){
        console.log(err)
    }
})


router.delete('/all',facebookMiddleware,async(req,res)=>{
    try{
        const me=await User.findOne({fbId:req.body.id})
        const deleteallNoti=await Notification.deleteMany({youId:me._id})
        res.status(200).json('delete all successfully')
    }
    catch(err){
        console.log(err)
    }
})


module.exports=router