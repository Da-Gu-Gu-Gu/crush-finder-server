const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const User = require('../models/user')



// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    enableProof: true,
    profileFields: ['email', 'id','friends','picture','displayName'] 
},
    async (accessToken, refreshToken, profile, done)=> {

        const currentUser = await User.findOne({ fbId: profile.id })
        if (!currentUser) {
            const newUser = await new User({
                fbId: profile.id,
                name:profile.displayName,
                email:profile.email,
                img:profile.photos[0].value
            
            }).save()
            if (newUser) {
                done(null, profile)
            }
        }
   
        
        
        done(null, profile)

    }))