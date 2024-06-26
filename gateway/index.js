const express = require('express')
const cors = require('core')
const proxy = require('express-http-proxy')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/user', proxy('http://localhost:8000'))
app.use('/product', proxy('http://localhost:8001'))
app.use('/order', proxy('http://localhost:8003'))

app.listen(8000, ()=>{
    console.log(`Listening on prt 8000`)
})