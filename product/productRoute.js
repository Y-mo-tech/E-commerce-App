const express = require('express')
const router = express.Router()

const path = require('./productController')

router.post('/addProducts', path.addProducts)

router.patch('/updateProduct', path.updateProduct)

router.get('/getProductDetails', path.getProductDetails)

router.get('/listProducts', path.listProducts)

router.get('/productAvailability', path.productAvailability)

router.delete('/deleteProduct', path.deleteProduct)

module.exports = router