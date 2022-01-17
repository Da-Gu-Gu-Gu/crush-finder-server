const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv').config()
const passport=require('passport')
const userRouter=require('./routes/user')
const matchuserRouter=require('./routes/matchuser')
const adminRouter=require('./routes/admin')


// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json())
app.use(cors())

//router
app.use('/',userRouter)
app.use('/match',matchuserRouter)
app.use('/admin',adminRouter)

mongoose.connect(process.env.MONGOOSE)
.then(()=>console.log('good'))
.catch((err)=>console.log(err))

app.listen(5000,()=>{
    console.log('server is running')
})