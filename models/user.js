const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    fbId:{
        type:String,
        required:true
    },
    cl:{
        type:Array,
    }
})

const User=mongoose.model('user',UserSchema)

module.exports=User