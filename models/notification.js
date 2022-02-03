const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const NotiSchema=new mongoose.Schema({
    youId:{
        type:ObjectId,
        ref:'user'
    },
    crushId:{
        type:ObjectId,
        ref:'user'
    },
    read:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    }       
})

const Notification=new mongoose.model('notification',NotiSchema)

module.exports=Notification