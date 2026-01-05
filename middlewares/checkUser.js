const jwt = require('jsonwebtoken')

const checkUser = (req, res, next) => {
    if (req.cookies.token) {
        try {
            const user = jwt.verify(req.cookies.token,process.env.JWT_SECRET)
            req.user = user
            res.locals.user = user   // ⭐ VERY IMPORTANT
        } catch (err) {
            req.user = null
            res.locals.user = null
        }
    } else {
        req.user = null
        res.locals.user = null
    }
    next()
}

module.exports = checkUser
