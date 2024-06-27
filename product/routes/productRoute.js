const express = require('express')
const router = express.Router()

const path = require('../controller/productController')

router.post('/addProducts', path.addProducts)

router.post('/productAvailability', path.productAvailability)

router.patch('/updateProduct', path.updateProduct)

router.get('/getProductDetails', path.getProductDetails)

router.get('/listProducts', path.listProducts)

router.delete('/deleteProduct', path.deleteProduct)

module.exports = router
