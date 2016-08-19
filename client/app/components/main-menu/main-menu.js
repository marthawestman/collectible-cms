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
var MainMenu = (function () {
    function MainMenu(userService) {
        this.userService = userService;
    }
    MainMenu.prototype.ngOnInit = function () {
    };
    MainMenu = __decorate([
        core_1.Component({
            selector: 'main-menu',
            templateUrl: 'app/components/main-menu/main-menu.html',
            styleUrls: ['app/components/main-menu/main-menu.css'],
        }), 
        __metadata('design:paramtypes', [user_1.UserService])
    ], MainMenu);
    return MainMenu;
}());
exports.MainMenu = MainMenu;
;
//# sourceMappingURL=main-menu.js.map