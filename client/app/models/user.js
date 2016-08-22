"use strict";
var User = (function () {
    function User() {
    }
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