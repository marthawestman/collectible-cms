var User = require('../../../models/user');
var jwt  = require('jsonwebtoken');
var crypto = require('crypto');

module.exports = function(app, router) {
    router.post('/api/authenticate', function(req, res) {
        // find the user
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                if (user.password != crypto.createHash('md5').update(req.body.password).digest('hex')) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    // if user is found and password is right
                    // create a token
                    var payload = {
                        "_id": user._doc._id,
                        "roles": user._doc.roles
                    };
                    var token = jwt.sign(payload, app.get('tokenSignature'), {
                        expiresIn: "24h" // expires in 24 hours
                    });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }   
            }
        });
    });
}
