const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    version:{
        type: Number,
        default: 0
    }
    
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
