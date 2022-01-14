const express=require('express')
const router=express.Router()
const passport=require('passport')
const FacebookController=require('../controllers/facebook')


router.get('/login/facebook',passport.authenticate("facebook"))
router.get('/login/facebook', passport.authenticate('facebook', {
    scope: [ 'email', 'friend' ]
  }));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/fail', failureMessage: true }),
  function(req, res) {
    res.redirect('/success')
  });



  router.get("/fail", (req, res) => {
    res.send("Failed attempt")
  })
  
  router.get("/success", (req, res) => {
    if (req.user) {
        res.json({
          success: true,
          message: "user has successfully authenticated",
            user:req.user
        })
    }
  })

module.exports=router