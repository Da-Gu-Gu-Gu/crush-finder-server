const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv').config()
const userRouter=require('./routes/user')
const passport=require('passport')
const matchuserRouter=require('./routes/matchuser')


// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json())
app.use(cors())

//router
app.use('/',userRouter)
app.use('/match',matchuserRouter)

mongoose.connect(process.env.MONGOOSE)
.then(()=>console.log('good'))
.catch((err)=>console.log(err))

app.listen(5000,()=>{
    console.log('server is running')
})