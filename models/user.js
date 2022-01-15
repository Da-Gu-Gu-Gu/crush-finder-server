const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    fbId:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    purl:{
        type:String
    },
    img:{
        type:String
    },
    cl:{
        type:Array,
        default:[]
    }
})

const User=mongoose.model('user',UserSchema)

module.exports=User