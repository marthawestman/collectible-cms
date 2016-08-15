/**
 * @apiDefine apiGroupUser User
 *
 * A potential user's email address should be verified before granting them a user record.
 *
 * <h4 id="userObject" class="object-anchor">User Object</h4>
 * <pre>
 * {<br />
 *     "_id": "57aacc69fb7e90e81aa5d5d4",<br />
 *     "name": {<br />
 *         "first": "admin",<br />
 *         "middle": "",<br />
 *         "last": "",<br />
 *         "suffix": "",<br />
 *     },<br />
 *     "email": "admin@localhost",<br />
 *     "password": "password",<br />
 *     "roles": [<br />
 *         "admin",<br />
 *         "user"<br />
 *     ]<br />
 * }
 * </pre>
 */

/**
 * @apiDefine apiErrorExampleUserNotFound
 * @apiErrorExample UserNotFound
 *     HTTP/1.1 404 Not Found
 *     {
 *         "status": false,
 *         "error": "UserNotFound"
 *     }
 */

var User = require('../../models/user');

module.exports = function(app, router) {
    /**
     * @api {get} /api/user Read all
     * @apiPermission apiPermissionAdmin
     * @apiGroup apiGroupUser
     * @apiName ReadAll
     * @apiDescription Read details for all user accounts.
     * @apiUse apiHeaderAccessToken
     * @apiUse apiSuccessStatus
     * @apiSuccess {String} data An array of user objects.
     * @apiSuccessExample One User Found
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": [{
     *             "_id": "57aacc69fb7e90e81aa5d5d4",
     *             "name": {
     *                 "first": "admin",
     *                 "middle": "",
     *                 "last": "",
     *                 "suffix": "",
     *             },
     *             "email": "admin@localhost",
     *             "password": "password",
     *             "roles": [
     *                 "admin",
     *                 "user"
     *             ]
     *         }]
     *     }
     * @apiSuccessExample No Users Found
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": []
     *     }
     * @apiUse apiErrorGeneric
     * @apiUse apiErrorExampleAccessToken
     * @apiUse apiErrorExampleNotAuthorized
     */
    router.get('/api/user', function(req, res) {
        if (req.decoded.roles.indexOf("admin") == -1) {
            res.status(401).json({
                "status": false,
                "error": "NotAuthorized",
                "message": "Administrative permission is required."
            });
        } else {
            User.find({}, function(err, users) {
                res.json({
                    "status": true,
                    "data": users
                });
            });
        }
    });
    /**
     * @api {get} /api/user/:id Read single
     * @apiPermission apiPermissionAdmin
     * @apiGroup apiGroupUser
     * @apiName ReadSingle
     * @apiDescription Read details for a single user account.
     * @apiUse apiHeaderAccessToken
     * @apiParam {Int} id The unique user identifier.
     * @apiUse apiSuccessStatus
     * @apiSuccess {String} data A single user object.
     * @apiSuccessExample User Found
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": {
     *             "_id": "57aacc69fb7e90e81aa5d5d4",
     *             "name": {
     *                 "first": "admin",
     *                 "middle": "",
     *                 "last": "",
     *                 "suffix": "",
     *             },
     *             "email": "admin@localhost",
     *             "password": "password",
     *             "roles": [
     *                 "admin",
     *                 "user"
     *             ]
     *         }
     *     }
     * @apiUse apiErrorGeneric
     * @apiUse apiErrorExampleAccessToken
     * @apiUse apiErrorExampleNotAuthorized
     * @apiUse apiErrorExampleUserNotFound
     */
    router.get('/api/user/:id', function(req, res) {
        if (req.decoded.roles.indexOf("admin") == -1) {
            res.status(401).json({
                "status": false,
                "error": "NotAuthorized",
                "message": "Administrative permission is required."
            });
        } else {
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    res.status(404).json({
                        "status": false,
                        "error": "UserNotFound",
                    });
                } else {
                    res.json({
                        "status": true,
                        "data": user
                    });
                }
            });
        }
    });
    /**
     * @api {get} /api/user Create
     * @apiPermission apiPermissionAdmin
     * @apiGroup apiGroupUser
     * @apiName Create
     * @apiDescription Create an authenticated user account. A potential user's
     *                 email address must be verified before granting them a
     *                 user record.
     * @apiUse apiHeaderAccessToken
     * @apiUse apiHeaderJson
     * @apiParamExample {JSON} Request Example
     *     {
     *         "name": {
     *             "first": "John",
     *             "middle": "",
     *             "last": "Lee",
     *             "suffix": "IV",
     *         },
     *         "email": "john.lee@localhost",
     *         "password": "password",
     *         "roles": [
     *             "user"
     *         ]
     *     }
     * @apiUse apiSuccessStatus
     * @apiSuccess {String} data A single user object.
     * @apiSuccessExample User Created
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": {
     *             "_id": "57aacc69fb7e90e81aa5d5d5",
     *             "name": {
     *                 "first": "John",
     *                 "middle": "",
     *                 "last": "Lee",
     *                 "suffix": "IV",
     *             },
     *             "email": "john.lee@localhost",
     *             "password": "password",
     *             "roles": [
     *                 "user"
     *             ]
     *         }
     *     }
     * @apiUse apiErrorGeneric
     * @apiUse apiErrorExampleAccessToken
     * @apiUse apiErrorExampleNotAuthorized
     * @apiUse apiErrorExampleFailure
     */
    router.post('/api/user', function(req, res) {
        if (req.decoded.roles.indexOf("admin") == -1) {
            res.status(401).json({
                "status": false,
                "error": "NotAuthorized",
                "message": "Administrative permission is required."
            });
        } else {
            var user = new User(req.body);
            user.save(function(err) {
                if (err) {
                    res.status(500).json({
                        "status": false,
                        "message": err.message
                    });
                } else {
                    res.json({
                        "status": true,
                        "data": user
                    });
                }
            });
        }
    });
    /**
     * @api {patch} /api/user/:id Update
     * @apiPermission apiPermissionAdmin
     * @apiPermission User
     * @apiGroup apiGroupUser
     * @apiName Update
     * @apiDescription A role of <code>Admin</code> may update any user object.
     *                 A role of <code>User</code> may only update their own
     *                 record. Because this is a patch, and not a post, only
     *                 the fields to change need to be included in json body.
     * @apiUse apiHeaderAccessToken
     * @apiUse apiHeaderJson
     * @apiParam {Int} id The unique identifier for user to update.
     * @apiParamExample {JSON} Update Full Record
     *     {
     *         "name": {
     *             "first": "John 2",
     *             "middle": "",
     *             "last": "Lee",
     *             "suffix": "IV",
     *         },
     *         "email": "john.lee@localhost",
     *         "password": "password",
     *         "roles": [
     *             "user"
     *         ]
     *     }
     * @apiParamExample {JSON} Update Partial Record
     *     {
     *         "name": {
     *             "first": "John 2",
     *         }
     *     }
     * @apiUse apiSuccessStatus
     * @apiSuccess {String} data A single user object.
     * @apiSuccessExample User Updated
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *         "data": {
     *             "_id": "57aacc69fb7e90e81aa5d5d5",
     *             "name": {
     *                 "first": "John 2",
     *                 "middle": "",
     *                 "last": "Lee",
     *                 "suffix": "IV",
     *             },
     *             "email": "john.lee@localhost",
     *             "password": "password",
     *             "roles": [
     *                 "user"
     *             ]
     *         }
     *     }
     * @apiUse apiErrorGeneric
     * @apiUse apiErrorExampleAccessToken
     * @apiUse apiErrorExampleNotAuthorized
     * @apiUse apiErrorExampleFailure
     * @apiUse apiErrorExampleUserNotFound
     */
    router.patch('/api/user/:id', function(req, res) {
        if ((req.params.id != req.decoded._id) && (req.decoded.roles.indexOf('admin') == -1)) {
            res.status(401).json({
                "status": false,
                "error": "NotAuthorized",
                "message": "You do not have permission to operate on this record."
            });
        } else {
            var userPatch = req.body;
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    res.status(404).json({
                        "status": false,
                        "error": "UserNotFound",
                        "message": err.message
                    });
                }
                if (userPatch.name != null && userPatch.name.first != null) {
                    user.name.first = userPatch.name.first;
                }
                user.save(function(err) {
                    if (err) {
                        res.status(500).json({
                            "status": false,
                            "error": "Unknown",
                            "message": err.message
                        });
                    } else {
                        res.json({
                            "status": true,
                            "data": user
                        });
                    }
                });
            });
        }
    });
    /**
     * @api {delete} /api/user/:id Delete
     * @apiPermission apiPermissionAdmin
     * @apiPermission apiPermissionUser
     * @apiGroup apiGroupUser
     * @apiName Delete
     * @apiDescription A role of <code>Admin</code> may delete any user object.
     *                 A role of <code>User</code> may only delete their own
     *                 object.
     * @apiUse apiHeaderAccessToken
     * @apiParam {Int} id The unique identifier for user to delete.
     * @apiUse apiSuccessStatus
     * @apiSuccessExample User Removed
     *     HTTP/1.1 200 OK
     *     {
     *         "status": true,
     *     }
     * @apiUse apiErrorGeneric
     * @apiUse apiErrorExampleAccessToken
     * @apiUse apiErrorExampleNotAuthorized
     * @apiUse apiErrorExampleFailure
     * @apiUse apiErrorExampleUserNotFound
     */
    router.delete('/api/user/:id', function(req, res) {
        if (req.decoded.roles == null || req.decoded.roles.indexOf('admin') == -1) {
            res.status(401).json({
                "status": false,
                "error": "NotAuthorized",
                "message": "You do not have permission to operate on this record."
            });
        } else {
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    res.status(404).json({
                        "status": false,
                        "error": "UserNotFound",
                        "message": err.message
                    });
                } else {
                    User.findByIdAndRemove(req.params.id, function(err, user) {
                        if (err) {
                            res.status(500).json({
                                "status": false,
                                "error": "Unknown",
                                "message": err.message
                            });
                        } else {
                            res.json({
                                "status": true,
                            });
                        }
                    });
                }
            });
        }
    });
}
