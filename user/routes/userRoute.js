const express = require('express')
const router = express.Router()
const path = require('../controllers/userController')
const verificationPath = require('../auth')
router.use(express.json())

console.log("in user route++++++++++++++++++++++")

router.post('/register', path.userRegister)

router.get('/login', path.userLogin)

router.get('/auth', verificationPath.userAuthentication)

module.exports = router
