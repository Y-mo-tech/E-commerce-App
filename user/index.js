const express = require('express')
const app = express()
const user = require('./routes/userRoute')
require('./db/db')
app.use(express.json())
const PORT = 8002

console.log('inside user index fxn---------')
app.use('/', user)

app.listen(PORT, ()=>{
    console.log(`User Service listening on port ${PORT}`)
})
