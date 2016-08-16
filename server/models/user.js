// Get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

// Set up a mongoose model and pass it using module.exports
var userSchema = new Schema({
    name: {
        first: String,
        middle: String,
        last: String,
        suffix: String
    },
    email: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, required: true },
    roles: [{ type: String, enum: ['admin', 'user'] }]
});
// Forst plain text passwords to be hashed.
userSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    user.password = crypto.createHash('md5').update(user.password).digest("hex");
    next();
});
// Get full name.
userSchema.methods.fullName = function() {
    return this.name.first + " " + this.name.last;
};
userSchema.methods.isAdmin = function() {
    return this.roles.indexOf('admin') > -1;
};
userSchema.methods.isUser = function() {
    return this.roles.indexOf('user') > -1;
};
userSchema.methods.isAnonymous = function() {
    return this.roles.indexOf('anonymous') > -1;
};

module.exports = mongoose.model('User', userSchema);

