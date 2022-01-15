const express=require('express')
const router=express.Router()
const passport=require('passport')
const FacebookController=require('../controllers/facebook')
const User = require('../models/user')

//facebook login 
router.get('/login/facebook',passport.authenticate("facebook"))
router.get('/login/facebook', passport.authenticate('facebook', {
    scope: [ 'email', 'public_profile','user_friends' ]
  }));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/fail', failureMessage: true }),
  function(req, res) {
    console.log(req.user)
    res.redirect('/success',req.profile)
  });



  router.get("/fail", (req, res) => {
    res.send("Failed attempt")
  })
  
  router.get("/success", (req, res) => {
      let sess=req.session
      res.json(sess.profile)
    // console.log(req.user)
    // res.send({ user: req.user })
    // if (req.user) {
    //   console.log(req.user.friends)
    //     res.json({
    //       success: true,
    //       message: "user has successfully authenticated",
    //         user:req.user
    //     })
    // }
  })


//custom part
router.put('/addcrush',async(req,res)=>{
  try {
    const addCrush=await User.findByIdAndUpdate(req.body.id,{
      cl:req.body.crushId
    },{
      new:true
    })
    res.status(200).json('added CrushList')
  } catch (error) {
    console.log(error)
  }
})

router.delete('/removecrush',async(req,res)=>{
  try {
    const removeCrush=await User.findByIdAndDelete(req.body.id,{
      
    })
    res.status(200).json('removed CrushList')
  } catch (error) {
    console.log(error)
  }
})

module.exports=router