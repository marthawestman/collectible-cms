var jwt = require('jsonwebtoken');

module.exports = function(app, router) {
    // Secure following routes with token.
    router.use(function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('tokenSignature'), function(err, decoded) {
                if (err) {
                    return res.status(401).json({ 
                        status: false, 
                        error: "NotAuthorized", 
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                status: false,
                error: "NotAuthorized",
                message: 'No token provided.'
            });
        }
    });
};
