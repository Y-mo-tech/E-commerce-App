const express = require('express')
const router = express.Router()
const path = require('../controllers/orderController')
const isAuthenticated = require('../middleware/checkAuth')

console.log("inside order route============================")

router.post('/addOrder', isAuthenticated, path.addOrder)

router.patch('/updateOrder', isAuthenticated, path.updateOrder)

router.get('/getOrder', isAuthenticated, path.getOrder)

router.get('/listOrders', isAuthenticated, path.listOrders)

router.delete('/deleteOrder', isAuthenticated, path.deleteOrder)

module.exports = router
