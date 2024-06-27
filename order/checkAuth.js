const axios = require('axios')
console.log("inside isAuthenticated fxn========================[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]")
async function checkAuth(req, res, next){
    try{
        console.log("inside checkAuth fxn")
        let token = req.headers['x-access-token']

        console.log("token in check auth fxn=========>", token)
        let method = 'GET'
        let url = 'http://localhost:8002/auth'
        let params = {
            token: token
        }
        let options = {
            method,
            url,
            params
        }
    
        let response = await axios(options)          // req.headers.authorization
        console.log("axios response", response)
        if(response.data.isAuthenticated){
            console.log("_+_+_+++++++++++++++++++++++++++++++++++++")
            let userId = response.data.userId
            console.log("userId in checkauth", userId)
            req.auth = {userId}
            next()
        } else{
            return res.status(400).json({message: response.data.message})
        }
    } catch(err){
        return res.status(500).json({message: "Some error occured", err})
    }
    
}

module.exports = checkAuth