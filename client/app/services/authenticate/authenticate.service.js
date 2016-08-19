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
var http_1 = require('@angular/http');
var http_2 = require('../http/http');
var AuthenticateService = (function () {
    function AuthenticateService(httpService) {
        this.httpService = httpService;
    }
    /**
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
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.httpService.post('/api/v1/authenticate', JSON.stringify(authenticate), {
            headers: headers
        }).map(function (res) {
            return res.json();
        }).map(function (res) {
            return res.token;
        });
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
        __metadata('design:paramtypes', [http_2.HttpService])
    ], AuthenticateService);
    return AuthenticateService;
}());
exports.AuthenticateService = AuthenticateService;
//# sourceMappingURL=authenticate.service.js.map