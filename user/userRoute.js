const express = require('express')
const router = express.Router()
const path = require('./userController')
const verify = require('./auth')
router.use(express.json())

router.post('/register', path.userRegister)

router.get('/login', path.userLogin)

module.exports = router