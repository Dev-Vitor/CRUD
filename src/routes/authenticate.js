const express = require("express")
const router = express.Router()

const Authenticate = require("../controllers/authenticateController")

router.post('/add', Authenticate.store)
router.post('/login', Authenticate.auth)


module.exports = router