const jwt = require('jsonwebtoken')
const secret = "Yunus@123c"

async function verify (req, res, next){
    let token = req.headers ['x-access-token']
    if(!token){
        return res.status(400).json({message : "Token not provided"})
    }
    jwt.verify(token, secret, async (err, decoded)=>{
        if(err){
            if(err.name == "TokenExpiredError"){
                return res.status(400).json({message : "Token Expired"})
            }
            else if(err.name === 'JsonWebTokenError'){
                return res.status(400).json({message : "Token doesn't match"})
            }
            return res.status(500).send(err)
        }
        
        const userId = decoded.userId
        req.auth = {userId}
        next()
    })
}

module.exports = verify;