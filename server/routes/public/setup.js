var User = require('../../models/user');

module.exports = function(app, router) {
    router.get('/setup', function(req, res) {
        User.find({}, function(err, users) {
            if (!users.length) {
                var user = new User({
                    name: {
                        first: "admin",
                        middle: "",
                        last: "",
                        suffix: ""
                    },
                    email: "admin@localhost",
                    password: "password",
                    roles: [
                        "admin",
                        "user"
                    ]
                });
                user.save();
                res.send("<p>Default admin user created</p><p>admin@localhost / password</p>");
            } else {
                res.send("<p>Users already exist.</p>");
            }
        });
    });
}
