var User = require('../../../models/user');

module.exports = function(app, router) {
    /**
     * @api {get} /api/user User list.
     * @apiPermission admin
     * @apiGroup Users
     * @apiName List Users
     *
     * @apiHeader {String} x-access-token Access token recieved from /api/authenticate
     *
     * @apiSuccess {Boolean} status True, credentials are valid..
     * @apiSuccess {String} message Description of success.
     * @apiSuccess {String} data An array of user objects.
     * @apiSuccessExample Success-Response:
     *     {
     *         "status": true,
     *         "message": "",
     *         "data": [{
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
     *
     * @apiError (Error 401) NotAuthorized The access token in 
     *           <code>x-access-token</code> header is invalid, or
     *           expired.
     * @apiError (Error 403) NotAuthorized The <code>x-access-token</code>
     *           header is missing.
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {
     *         "status": false,
     *         "error": "NotAuthorized",
     *         "message": "Failed to authenticate token."
     *      }
     */
    router.get('/api/user', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });
    /**
     * Get a single user record.
     */
    router.get('/api/user/:id', function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.json({ "status": false, "message": err.message });
            } else {
                res.json({ "status": true, "data": user });
            }
        });
    });
    /**
     * Create a user record.
     */
    router.post('/api/user', function(req, res) {
        var user = new User(req.body);
        user.save(function(err) {
            if (err) {
                res.json({ "status": false, "message": err.message });
            } else {
                res.json({ "status": true, "data": user });
            }
        });
    });
    /**
     * Update a user record.
     *
     * Because this is a patch only the fields to change need to be sent via json.
     */
    router.patch('/api/user/:id', function(req, res) {
        if ((req.params.id != req.decoded._id) && (req.decoded.roles.indexOf('admin') == -1)) {
            res.json({ "status": false, "message": "Not authorized." });
        }
        var userPatch = req.body;
        User.findById(req.params.id, function(err, user) {
            if (userPatch.name != null && userPatch.name.first != null) {
                user.name.first = userPatch.name.first;
            }
            user.save(function(err) {
                if (err) {
                    res.json({ "status": false, "message": err.message });
                } else {
                    res.json({ "status": true, "message": "Record updated." });
                }
            });
        }); 
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
