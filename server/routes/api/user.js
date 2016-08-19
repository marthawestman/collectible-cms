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

var User = require('../../models/user');

module.exports = function(app, router) {
    /**
     * @api {get} /api/v1/user Read all
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
    router.get('/user', function(req, res) {
        if (!req.user.isAdmin()) {
            res.notAuthorized();
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
     * @api {get} /api/v1/user/:id Read single
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
     * @apiUse apiErrorExampleNotFound
     */
    router.get('/user/:id', function(req, res) {
        if (!req.user.isAdmin()) {
            res.notAuthorized();
        } else {
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    req.notFound();
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
     * @api {post} /api/v1/user Create
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
    router.post('/user', function(req, res) {
        if (!req.user.isAdmin()) {
            res.notAuthorized();
        } else {
            var user = new User(req.body);
            user.save(function(err) {
                if (err) {
                    res.failure(err);
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
     * @api {patch} /api/v1/user/:id Update
     * @apiPermission apiPermissionUser
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
     * @apiUse apiErrorExampleNotFound
     */
    router.patch('/user/:id', function(req, res) {
        if ((req.params.id != req.user._id) && (!req.user.isAdmin())) {
            res.notAuthorized();
        } else {
            var userPatch = req.body;
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    res.notFound();
                }
                if (userPatch.name != null && userPatch.name.first != null) {
                    user.name.first = userPatch.name.first;
                }
                user.save(function(err) {
                    if (err) {
                        res.failure(err);
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
     * @api {delete} /api/v1/user/:id Delete
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
     * @apiUse apiErrorExampleNotFound
     */
    router.delete('/user/:id', function(req, res) {
        if (!req.user.isAdmin()) {
            res.notAuthorized();
        } else {
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    res.notFound();
                } else {
                    user.remove(function(err, user) {
                        if (err) {
                            res.failure(err);
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
