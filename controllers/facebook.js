const res = require('express/lib/response');
const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const User = require('../models/user')

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
    done(null, user.id);
  })

passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(e => {
        done(new Error("Failed to deserialize an user"));
      });
  })


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
},
    async (accessToken, refreshToken, profile, done)=> {
        console.log(profile)
        const currentUser = await User.findOne({ fbId: profile.id })
        if (!currentUser) {
            const newUser = await new User({
                fbId: profile.id,
            }).save()
            if (newUser) {
                done(null, newUser)
            }
        }
        done(null, currentUser)
    }))