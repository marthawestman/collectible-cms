"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var user_1 = require('../../services/user/user');
var authenticate_service_1 = require('../../services/authenticate/authenticate.service');
var LogIn = (function () {
    function LogIn(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    LogIn.prototype.logIn = function () {
        var _this = this;
        this.authService.authenticate(this.name, this.password)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.success(data.token); }, function (err) { return _this.failure(err); }, function () { return console.log('Authentication Complete'); });
    };
    LogIn.prototype.success = function (token) {
        this.authService.putToken(token);
        alert('Authenticated!');
    };
    LogIn.prototype.failure = function (err) {
        console.log(err);
        alert(err);
    };
    LogIn.prototype.ngOnInit = function () {
    };
    LogIn = __decorate([
        core_1.Component({
            selector: 'log-in',
            templateUrl: 'app/components/log-in/log-in.html',
            styleUrls: ['app/components/log-in/log-in.css'],
        }), 
        __metadata('design:paramtypes', [authenticate_service_1.AuthenticateService, user_1.UserService])
    ], LogIn);
    return LogIn;
}());
exports.LogIn = LogIn;
;
//# sourceMappingURL=log-in.component.js.map