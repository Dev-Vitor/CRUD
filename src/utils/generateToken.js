const jwt = require('jsonwebtoken') 
const authConfig = process.env.JWT_SECRET_KEY

module.exports = function(params = {}){
        return jwt.sign(params, authConfig, {
            expiresIn: 86400
        })
}