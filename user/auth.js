const jwt = require('jsonwebtoken')
const secret = "Yunus@123c"

async function userAuthentication (req, res){
    try{

        console.log("inside user auth in user.js file ____________")
        let token = req.query.token
        console.log("token in user file -----------------", token)
        if(!token){
            return res.status(400).json({message : "Token not provided"})
        }
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                if(err.name == "TokenExpiredError"){
                    console.log("TokenExpiredError")
                    return res.status(400).json({message : "Token Expired"})
                }
                else if(err.name === 'JsonWebTokenError'){
                    console.log("JsonWebTokenError")
                    return res.status(400).json({message : "Token doesn't match"})
                }
                return res.status(500).json({message: err.message})
            }
            
            let userId = decoded.userId
            console.log("userId   _+_+_+_+_+_+_+_+_+_+_+_+_+_", userId)
            //req.auth = {userId}
            return res.status(200).json({isAuthenticated: true, userId: userId })
        })
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {userAuthentication};