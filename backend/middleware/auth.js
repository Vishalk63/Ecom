const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        return res.json({
            "msg": "there is no token",
            "success": false
        })
    }

    if (token) {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                return res.json({
                    "msg": "err while verify token",
                    "success": false
                })
            }

            // console.log(decoded.id)
            req.user = decoded
            next()
        });
    }
}

module.exports = auth;