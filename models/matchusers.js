const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const MatchUserSchema=new mongoose.Schema({
    matchfrom:{
        type:ObjectId,
        ref:'user'
    },
    matchto:{
        type:ObjectId,
        ref:'user'
    },
})

const MatchUser=mongoose.model('matchuser',MatchUserSchema)

module.exports=MatchUser