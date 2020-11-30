const express = require("express")
const router = express.Router()

const authenticate = require("./authenticate")
const admin = require('./admin')
const post = require('./post')


router.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome in my API" })
})

router.use('/auth', authenticate)
router.use('/admin', admin)
router.use('/post', post)


module.exports = router