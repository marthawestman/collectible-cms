var User = require('../../../models/user');
var jwt  = require('jsonwebtoken');
var crypto = require('crypto');

module.exports = function(app, router) {
    /**
     * @api {post} /api/authenticate Request access token
     * @apiGroup Authentication
     * @apiName Authenticate
     * @apiDescription A JSON Web Token is required to access most api
     *                 endpoints. After authenticating with an email
     *                 address and password a token will be provided.
     *                 The token should be placed in a x-access-token
     *                 header for all secured api requests.
     * @apiPermission Public
     * @apiHeader {String} Content-Type=application/json
     * @apiParamExample {JSON} Request Example
     *     {
     *         "email": "admin@localhost",
     *         "password": "password"
     *     }
     * @apiUse apiSuccessStatus
     * @apiSuccess {String} token An array of user objects.
     * @apiSuccess {String} token The JSON Web Token which should be placed in the http header x-access-token
     *                      for subsequent authorized requests.
     * @apiSuccessExample {JSON} Token Granted
     *     {
     *         "status": true,
     *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9.
yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw"
     *     }
     * @apiUse apiErrorGeneric
     * @apiErrorExample {JSON} User Not Found
     *     HTTP/1.1 404 Not Found
     *     {
     *         "status": false,
     *         "error": "UserNotFound",
     *         "message": "Authentication failed. User not found."
     *      }
     * @apiErrorExample {JSON} Invalid Credentials
     *     HTTP/1.1 401 Not Found
     *     {
     *         "status": false,
     *         "error": "NotAuthorized",
     *         "message": "The password for the user was incorrect."
     *      }
     */
    router.post('/api/authenticate', function(req, res) {
        // find the user
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.status(404).json({ status: false, error: "UserNotFound", message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                if (user.password != crypto.createHash('md5').update(req.body.password).digest('hex')) {
                    res.status(401).json({ status: false, error: "NotAuthorized", message: 'Authentication failed. Wrong password.' });
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
                        status: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        });
    });
}
