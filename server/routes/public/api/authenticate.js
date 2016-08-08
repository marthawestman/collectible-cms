var User = require('../../../models/user');
var jwt  = require('jsonwebtoken');
var crypto = require('crypto');

module.exports = function(app, router) {
    /**
     * @api {post} /api/authenticate Submit valid credentials and receive an access token.
     * @apiPermission none
     * @apiGroup Authentication
     * @apiName Authenticate
     *
     * @apiParam {String} email Email address of account requesting access token.
     * @apiParam {String} password Password of account requesting access token.
     * @apiParamExample {json} Request-Example:
     *     {
     *         "email": "registered.user@gmail.com",
     *         "password": "mypassword"
     *     }
     *
     * @apiSuccess {Boolean} status True, credentials are valid..
     * @apiSuccess {String} message Description of success.
     * @apiSuccess {String} token The JSON Web Token which should be placed in the http header x-access-token
     *                      for subsequent authorized requests.
     * @apiSuccessExample Success-Response:
     *     {
     *         "status": true,
     *         "message": "Enjoy your token!",
     *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.
yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw"
     *     }
     *
     * @apiError (Error 404) UserNotFound The <code>email</code> of the user was not found.
     * @apiError (Error 401) NotAuthorized The <code>password</code> for the user did not match.
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *         "status": false,
     *         "error": "UserNotFound",
     *         "message": "Authentication failed. User not found."
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
