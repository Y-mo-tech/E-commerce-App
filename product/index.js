const express = require('express')
const app = express()
const product = require('./productRoute')
require('./db')
app.use(express.json())
const PORT = 8001

app.use('/', product)

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})