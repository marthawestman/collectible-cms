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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var http_service_1 = require('./services/http/http.service');
var user_service_1 = require('./services/user/user.service');
var authenticate_service_1 = require('./services/authenticate/authenticate.service');
var config_service_1 = require('./services/config/config.service');
var AppComponent = (function () {
    function AppComponent(titleService, configService) {
        this.titleService = titleService;
        this.configService = configService;
        this.config = null;
        this.working = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.working = true;
        this.configService.read().subscribe(function (configContainer) {
            if (configContainer) {
                _this.configContainer = configContainer;
                _this.titleService.setTitle(_this.configContainer.config.siteTitle);
            }
        }, function (err) { console.log(err); }, function () { _this.working = false; });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n        <div class=\"public-app\">\n            <cc-site-menu-main></cc-site-menu-main>\n            <div *ngIf=\"!working && configContainer.config.motd.length\" class=\"motd\">\n                {{ configContainer.config.motd }}\n            </div>\n            <router-outlet></router-outlet>\n        </div>\n    ",
            styles: ["\n        .motd {\n            padding: 0.4em;\n            font-size: 0.90em;\n            background-color: #f9f9f9;\n            color: #00a000;\n            border-top: 1px solid #d0d0d0;\n            border-bottom: 1px solid #e0e0e0;\n            text-align: center;\n        }\n    "],
            providers: [
                platform_browser_1.Title,
                http_1.HTTP_PROVIDERS,
                http_service_1.HttpService,
                user_service_1.UserService,
                authenticate_service_1.AuthenticateService,
                config_service_1.ConfigService
            ]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, config_service_1.ConfigService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
;
//# sourceMappingURL=app.component.js.map