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
var user_1 = require('../../models/user');
var http_service_1 = require('../http/http.service');
var AuthenticateService = (function () {
    function AuthenticateService(httpService) {
        this.httpService = httpService;
        this.currentUser = new user_1.CurrentUser();
        if (typeof (this.currentUser.user) == 'undefined' || this.currentUser.user == null) {
            this.currentUser.user = new user_1.User();
        }
        this.updateCurrentUser();
    }
    /**
     * Request authentication and return JWT in observable.
     *
     * @example
     *     AuthService.authenticate(name, password)
     *     .subscribe(
     *         token => console.log("success: " + token),
     *         err => console.log("error: " + err),
     *         () => console.log('Authentication Complete')
     *     );
     */
    AuthenticateService.prototype.authenticate = function (email, password) {
        var authenticate = {
            email: email,
            password: password
        };
        return this.httpService.postSimple('/api/v1/authenticate', authenticate)
            .map(function (json) { return json.token; });
    };
    AuthenticateService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthenticateService.prototype.setToken = function (token) {
        if (token) {
            localStorage.setItem('token', token);
        }
        return this;
    };
    AuthenticateService.prototype.deleteToken = function () {
        localStorage.removeItem('token');
        return this;
    };
    AuthenticateService.prototype.updateCurrentUser = function () {
        var token = this.getToken();
        var user = new user_1.User();
        if (typeof (token) != 'undefined' && token != null) {
            var decoded = jwt_decode(token);
            user._id = decoded._id;
            user.email = decoded.email;
            user.name = decoded.name;
            user.roles = decoded.roles;
        }
        this.currentUser.user = user;
        return this;
    };
    AuthenticateService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    AuthenticateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_service_1.HttpService])
    ], AuthenticateService);
    return AuthenticateService;
}());
exports.AuthenticateService = AuthenticateService;
//# sourceMappingURL=authenticate.service.js.map