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
var http_1 = require('../http/http');
var AuthenticateService = (function () {
    function AuthenticateService(httpService) {
        this.httpService = httpService;
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
        return this.httpService.postSimple('/api/v1/authenticate', JSON.stringify(authenticate))
            .map(function (json) { return json.token; });
    };
    AuthenticateService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthenticateService.prototype.setToken = function (token) {
        if (token) {
            localStorage.setItem('token', token);
        }
    };
    AuthenticateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.HttpService])
    ], AuthenticateService);
    return AuthenticateService;
}());
exports.AuthenticateService = AuthenticateService;
//# sourceMappingURL=authenticate.service.js.map