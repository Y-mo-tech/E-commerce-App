const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

app.use('/product', proxy('http://product-service:8001'))
app.use('/user', proxy('http://user-service:8002'))
app.use('/order', proxy('http://order-service:8003'))

app.listen(PORT, ()=>{
    console.log(`Listening on port 8000`)
})
