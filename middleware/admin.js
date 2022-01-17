const jwt=require('jsonwebtoken')
const Admin=require('../models/admin')

module.exports=async(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization) return res.status(401).json('access denied')
    const tokenVerify=authorization.replace('Bearer ',"")
    jwt.verify(tokenVerify,process.env.JWT_SECRET,(err,payload)=>{
        if(err)return res.status(401).json('acess denied')
        const {id}=payload

        Admin.findById(id).then((userdata)=>{  
            req.user=userdata
            console.log(req.user)
            next()
        })
    })
}