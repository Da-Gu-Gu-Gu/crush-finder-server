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

//crush match fix lr sit
router.post('/',async(req,res)=>{
    try{
        
        //you c ka ya tl crush list htl ka hr twy ta ku chin sit ml 
        //crush htl ka ll sit ml tuu sin add ml ok?
        let foundCrush=false
        const crush=await User.findOne({fbId:crush})
        crush.cl.map(z=>req.body.you==z?foundCrush=true:null)
        
        if(foundCrush){
        await new MatchUser({
            matchfrom:req.body.you,  
            matchto:req.body.crush
        }).save()

        res.status(200).json('found crush')
    }
    }
    catch(err){console.log(err)}
})


module.exports=router