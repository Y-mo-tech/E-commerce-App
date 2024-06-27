const express = require('express')
const app = express()
const user = require('./userRoute')
require('./db')
app.use(express.json())
const PORT = 8002

console.log('inside user index fxn---------')
app.use('/', user)

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})