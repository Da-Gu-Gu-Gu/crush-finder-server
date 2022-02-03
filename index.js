const express=require('express')
const app=express()
const session = require('express-session');
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv').config()
const passport=require('passport')
const userRouter=require('./routes/user')
const matchuserRouter=require('./routes/matchuser')
const adminRouter=require('./routes/admin')
const notiRouter=require('./routes/notification')


app.use(express.json())
app.use(cors({
  // origin:process.env.FRONTEND_URL,
  origin:'*',
  methods:'GET,POST,DELETE,PUT',
  credentials:true
}))



app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));


app.use(passport.initialize())
app.use(passport.session())



//router
app.get('/test',(req,res)=>{
  res.send('test')
})
app.use('/',userRouter)
app.use('/match',matchuserRouter)
app.use('/admin',adminRouter)
app.use('/noti',notiRouter)



mongoose.connect(process.env.MONGOOSE)
.then(()=>console.log('good'))
.catch((err)=>console.log(err))

app.listen(5000,()=>{
    console.log('server is running')
})

// https.createServer(options, app).listen(5000,()=>{
//   console.log('server is running')
// })