var fs = require('fs');
var jwt = require('jsonwebtoken');

module.exports = function(app, router) {
    // Insert middle-ware to secure all following routes with token.
    router.use(function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('tokenSignature'), function(err, decoded) {
                if (err) {
                    return res.status(401).json({
                        status: false,
                        error: "AccessToken",
                        message: 'The access token in x-access-token header is invalid or expired.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                status: false,
                error: "AccessToken",
                message: 'The x-access-token header is missing.'
            });
        }
    });
    // Include all files and sub-directories.
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == 'index.js') return;
        var name = file.substr(0, (file.indexOf('.') == -1) ? file.length : file.indexOf('.'));
        require('./' + name)(app, router);
    });
};
