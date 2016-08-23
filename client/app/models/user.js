"use strict";
var name_1 = require('./name');
var User = (function () {
    function User(user) {
        this.name = new name_1.Name();
        if (user != null) {
            this.map(user);
        }
    }
    User.prototype.map = function (user) {
        this._id = (typeof (user._id) == 'undefined') ? this._id : user._id;
        this.email = (typeof (user.email) == 'undefined') ? this.email : user.email;
        this.password = (typeof (user.password) == 'undefined') ? this.password : user.password;
        this.roles = (typeof (user.roles) == 'undefined') ? this.roles : user.roles;
        this.name = (typeof (user.name) == 'undefined') ? this.name : user.name;
        this.image = (typeof (user.image) == 'undefined') ? this.image : user.image;
        return this;
    };
    User.prototype.isRegistered = function () {
        if (this._id != null && this._id != "0") {
            return true;
        }
        return false;
    };
    ;
    User.prototype.hasRole = function (role) {
        var hasRole = false;
        if (this.isRegistered() && this.roles.indexOf(role) > -1) {
            hasRole = true;
        }
        return hasRole;
    };
    User.prototype.isAdmin = function () {
        return this.hasRole('admin');
    };
    User.prototype.isUser = function () {
        return this.hasRole('user');
    };
    User.prototype.isAnonymous = function () {
        return this.hasRole('anonymous');
    };
    return User;
}());
exports.User = User;
var CurrentUser = (function () {
    function CurrentUser() {
    }
    return CurrentUser;
}());
exports.CurrentUser = CurrentUser;
//# sourceMappingURL=user.js.map