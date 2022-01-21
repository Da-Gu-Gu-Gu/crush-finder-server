const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization) return res.status(401).json('access denied')
    const tokenVerify=authorization.replace("Bearer ","")
    jwt.verify(tokenVerify,process.env.JWT_SECRET,(err,payload)=>{
        if(err) return res.status(401).json('access denied')
        const {token}=payload
        const {profile}=payload
        req.accesstoken=token
        req.profile=profile
        next()
    })
}