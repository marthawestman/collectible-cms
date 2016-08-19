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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
// Landing pages.
var password_reset_component_1 = require('./components/password-reset/password-reset.component');
var user_edit_component_1 = require('./components/user-edit/user-edit.component');
var site_home_component_1 = require('./components/site-home/site-home.component');
// Components.
var main_menu_1 = require('./components/main-menu/main-menu');
var log_in_component_1 = require('./components/log-in/log-in.component');
var appRoutes = [
    {
        path: '',
        component: site_home_component_1.SiteHome
    },
    {
        path: 'password-reset',
        component: password_reset_component_1.PasswordReset
    },
    {
        path: 'user-edit',
        component: user_edit_component_1.UserEdit
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(appRoutes)
            ],
            declarations: [app_component_1.AppComponent, main_menu_1.MainMenu, log_in_component_1.LogIn],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map