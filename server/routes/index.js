var fs = require('fs');

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
/**
 * @apiDefine apiErrorExampleFailure
 * @apiErrorExample Failure
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *         "status": false,
 *         "error": "ReqFailed",
 *         "message": "*A generic description of error will be provided*"
 *     }
 */

module.exports = function(app, router) {
    // Include all files and sub-directories.
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == 'index.js') return;
        var name = file.substr(0, (file.indexOf('.') == -1) ? file.length : file.indexOf('.'));
        require('./' + name)(app, router);
    });
};
