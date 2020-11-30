const jwt = require('jsonwebtoken')
const adminKey = process.env.JWT_SECRET_ADMIN_KEY

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" })
    }

    const parts = authHeader.split(" ")

    if (!parts.length === 2) {
        return res.status(401).json({ message: "Token error" })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Token malformatted" })
    }

    jwt.verify(token, adminKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalid" })
        }
        req.userId = decoded.id
        return next()
    })
}