const express = require('express')
const app = express()
const product = require('./routes/productRoute')
require('./db/db')
app.use(express.json())
const PORT = 8001

app.use('/', product)

app.listen(PORT, ()=>{
    console.log(`Product Service listening on port ${PORT}`)
})
