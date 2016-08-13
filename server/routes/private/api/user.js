var User = require('../../../models/user');

module.exports = function(app, router) {
    /**
     * @api {get} /api/user Read all
     * @apiPermission Admin
     * @apiGroup User
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
     * @apiPermission Admin
     * @apiGroup User
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
     * @apiErrorExample UserNotFound
     *     HTTP/1.1 404 Not Found
     *     {
     *         "status": false,
     *         "error": "UserNotFound"
     *         "message": "User not found."
     *     }
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
                        "message": "User not found."
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
     * @apiPermission Admin
     * @apiGroup User
     * @apiName Create
     * @apiDescription Create an authenticated user account. A potential user's
     *                 email address must be verified before granted them a
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
     * @apiPermission Admin
     * @apiPermission User
     * @apiGroup User
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
     * @apiErrorExample UserNotFound
     *     HTTP/1.1 404 Not Found
     *     {
     *         "status": false,
     *         "error": "UserNotFound"
     *         "message": "User not found."
     *     }
     */
    router.patch('/api/user/:id', function(req, res) {
        if ((req.params.id != req.decoded._id) && (req.decoded.roles.indexOf('admin') == -1)) {
            res.status(401).json({
                "status": false,
                "error": "NotAuthorized",
                "message": "You do not have permission to update this record."
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
     * Delete a user record.
     */
    router.delete('/api/user/:id', function(req, res) {
        if (req.decoded.roles == null || req.decoded.roles.indexOf('admin') == -1) {
            res.json({ "status": false, "message": "Not authorized." });
        } else {
            User.findByIdAndRemove(req.params.id, function(err, offer) {
                if (err) {
                    res.json({ "status": false, "message": err.message });
                } else {
                    res.json({ "status": true, "message": "Removed." });
                }
            });
        }
    });
}
