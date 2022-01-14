const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv').config()
const userRouter=require('./routes/user')



app.use(express.json())
app.use(cors())

//router
app.use('/',userRouter)

mongoose.connect(process.env.MONGOOSE)
.then(()=>console.log('good'))
.catch((err)=>console.log(err))

app.listen(5000,()=>{
    console.log('server is running')
})