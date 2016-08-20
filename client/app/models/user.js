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
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map