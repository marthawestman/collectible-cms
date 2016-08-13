var jwt = require('jsonwebtoken');

/**
 * @apiDefine Admin Admin
 * The request must authenticate the user with a json web token. The user must have a role of "admin".
 */
/**
 * @apiDefine User User
 * The request must authenticate the user with a json web token. The user must have a role of "user".
 */
/**
 * @apiDefine Public Public
 * The request may be anonymous. No user role is required.
 */

/**
 * @apiDefine apiHeaderAccessToken
 * @apiHeader {string} x-access-token Access token recieved from <a href="/apidoc/#api-Authentication-Authenticate">authentication</a>
 */
/**
 * @apiDefine apiHeaderJson
 * @apiHeader {String} Content-Type=application/json
 */

/**
 * @apiDefine apiSuccessStatus
 * @apiSuccess {Bool} status Always <code>true</code>on success. Request executed without exception.
 */

/**
 * @apiDefine apiErrorGeneric
 * @apiError (Error 4xx) {Bool} status Always <code>false</code> on errors.
 * @apiError (Error 4xx) {String} error The error code identifier.
 * @apiError (Error 4xx) {String} message Additional details about the error.
 */
/**
 * @apiDefine apiErrorExampleAccessToken
 * @apiErrorExample AccessToken
 *     HTTP/1.1 401 Unauthorized
 *     {
 *         "status": false,
 *         "error": "AccessToken",
 *         "message": "The access token in x-access-token header is invalid or expired."
 *     }
 * @apiErrorExample AccessToken
 *     HTTP/1.1 403 Forbidden
 *     {
 *         "status": false,
 *         "error": "AccessToken",
 *         "message": "The x-access-token header is missing."
 *     }
 */
/**
 * @apiDefine apiErrorExampleNotAuthorized
 * @apiErrorExample NotAuthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *         "status": false,
 *         "error": "NotAuthorized",
 *         "message": "Current user does not posses correct authorization role."
 *     }
 */

module.exports = function(app, router) {
    // Secure following routes with token.
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
};
