const express = require('express')
const router = express.Router()
const passport = require('passport')
const FacebookController = require('../controllers/facebook')
const User = require('../models/user')
const MatchUser = require('../models/matchusers')
const jwt = require('jsonwebtoken')
const facebookMiddleware = require('../middleware/facebookkuser')


router.get("/", (req, res) => {
  res.send("hh")
})

//user create
router.post('/user', async (req, res) => {
  try {
    const savedUser = await User.findOne({ fbId: req.body.fbId })
    const jwtToken = jwt.sign({
      token: req.body.fbId,
      profile: req.body.fbId
    },
      process.env.JWT_SECRET
    )

    if (!savedUser) {
      const newUser = await new User({
        fbId: req.body.fbId,
        name: req.body.name,
        email: req.body.email,
        img: req.body.img
      }).save()
    }
    res.status(200).json({
      message: jwtToken
    })

  } catch (error) {
    res.status(401).json({
      message: 'error'
    })
  }
})

//custom part
router.put('/addcrush', facebookMiddleware, async (req, res) => {
  try {
    if (!req.accesstoken) return res.status(401).json("access denied")
    const preciousCrushList = await User.findOne({ fbId: req.body.id })
    const newCrushList = [...preciousCrushList.cl, req.body.crushId]
    await User.findOneAndUpdate({ fbId: req.body.id }, {
      cl: newCrushList
    }, {
      new: true
    })

    let yourSide, crushSide = false

    const you = await User.findOne({ fbId: req.body.id })
    const crush = await User.findOne({ fbId: req.body.crushId })

    you.cl.map(x => { x == crush.fbId ? yourSide = true : null })
    crush.cl.map(y => { y == you.fbId ? crushSide = true : null })


    if (yourSide && crushSide) {
      await new MatchUser({
        matchfrom: you._id,
        matchto: crush._id
      }).save()

      await new MatchUser({
        matchfrom: crush._id,
        matchto: you._id
      }).save()

      res.status(200).json('found crush')
    } else {
      res.status(200).json('not match')
    }
  } catch (error) {
    console.log(error)
  }
})

router.put('/removecrush', facebookMiddleware, async (req, res) => {
  try {
    if (!req.accesstoken) return res.status(401).json("access denied")
    const preciourCrushList = await User.findOne({ fbId: req.body.id })
    const newCrushList = preciourCrushList.cl.filter(x => x != req.body.crushId)
    await User.findOneAndUpdate({ fbId: req.body.id }, {
      cl: newCrushList,
    }, {
      new: true
    })
    res.status(200).json('removed CrushList')
  } catch (error) {
    console.log(error)
  }
})

router.post('/mycrushlist', facebookMiddleware, async (req, res) => {
  try {
    if (!req.accesstoken) return res.status(401).json("access denied")
    const crushList = await User.findOne({ fbId: req.body.id })
    res.status(200).json(crushList.cl)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router