const mongoose = require("mongoose")

const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/UserData';

mongoose.connect(mongoURL)
.then(()=>{
    console.log("Connection Successfull")
}).catch((err)=>{
    console.log("Not connected")
})
