const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const MatchUserSchema=new mongoose.Schema({
    matchfrom:{
        type:ObjectId,
        ref:'User'
    },
    matchto:{
        type:ObjectId,
        ref:'User'
    },
})

const MatchUser=mongoose.model('matchuser',MatchUserSchema)

module.exports=MatchUser