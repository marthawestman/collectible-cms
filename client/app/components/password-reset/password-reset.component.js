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
var PasswordReset = (function () {
    function PasswordReset(http) {
        this.http = http;
        this.password1 = "";
        this.password2 = "";
        this.key = "";
        this.working = false;
        this.title = 'Password Reset';
    }
    PasswordReset.prototype.requestReset = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.working = true;
        var self = this;
        this.http.post('/api/public/account/reset', '{ Upn: "' + this.upn + '" }', { headers: headers }).subscribe(function (res) {
            return function () {
                self.working = false;
                var result = res.json();
                if (result.Status.Success) {
                    self.requestSuccess = true;
                }
                else {
                    self.requestSuccess = false;
                }
            }();
        });
    };
    PasswordReset.prototype.reset = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.working = true;
        var self = this;
        this.http.post('/api/public/account/reset', '{ Upn: "' + this.upn + '", Key: "' + this.key + '", Password: "' + this.password1 + '" }', { headers: headers }).subscribe(function (res) {
            return function () {
                self.working = false;
                var result = res.json();
                if (result.Status.Success) {
                    self.resetSuccess = true;
                }
                else {
                    self.resetSuccess = false;
                }
            }();
        });
    };
    PasswordReset.prototype.ngOnInit = function () {
    };
    PasswordReset = __decorate([
        core_1.Component({
            selector: 'password-reset',
            templateUrl: 'app/components/password-reset/password-reset.html',
            styleUrls: ['app/components/password-reset/password-reset.css'],
            directives: []
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PasswordReset);
    return PasswordReset;
}());
exports.PasswordReset = PasswordReset;
;
//# sourceMappingURL=password-reset.component.js.map