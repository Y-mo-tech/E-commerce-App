const express = require('express')
const app = express()
const order = require('./orderRoute')
require('./db')
app.use(express.json())
const PORT = 8003

app.use('/', order)

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})