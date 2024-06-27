const express = require('express')
const app = express()
const order = require('./routes/orderRoute')
require('./db/db')
app.use(express.json())
const PORT = 8003

app.use('/', order)

app.listen(PORT, ()=>{
    console.log(`Order Service listening on port ${PORT}`)
})
