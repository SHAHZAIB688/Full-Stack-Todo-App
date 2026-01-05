const jwt = require('jsonwebtoken')

const isLoggedIn = (req, res, next) => {
    if (!req.cookies.token) {
        return res.redirect('/signup')
    }

    try {
        const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        req.user = data
        next()
    } catch (err) {
        return res.redirect('/login')
    }
}

module.exports = isLoggedIn
