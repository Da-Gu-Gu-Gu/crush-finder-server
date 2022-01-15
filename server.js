const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv').config()
const userRouter=require('./routes/user')
const matchuserRouter=require('./routes/matchuser')
const session = require('express-session')


app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 365 * 1000
    }
  }))
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