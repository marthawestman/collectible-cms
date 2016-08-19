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
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.get = function (url) {
        return this.http.get(url);
    };
    /**
     * Issue post request and return raw http response in observable.
     *
     * @example
     *	   var authenticate = { email: email, password: password };
     *     var headers = new Headers();
     *     headers.append('Content-Type', 'application/json');
     *	   return this.httpService.post('/api/v1/authenticate', JSON.stringify(authenticate), { headers: headers })
     *         .map( (res) => { return res.json(); })
     *         .map( (res) => { return res.token; })
     *         .subscribe(
     *		       token => console.log("token " + token),
     *	           err => console.log("error " + err),
     *	           () => console.log('Authentication Complete')
     *	       );
     */
    HttpService.prototype.post = function (url, body, options) {
        return this.http.post(url, body, options);
    };
    /**
     * Issue post request with 'applicaton/json' header and return deserialized
     * json response in observable.
     *
     * @example
     *	   var authenticate = { email: email, password: password };
     *	   return this.httpService.postSimple('/api/v1/authenticate', JSON.stringify(authenticate))
     *         .map( (json) => { return json.token; })
     *         .subscribe(
     *		       token => console.log("token " + token),
     *	           err => console.log("error " + err),
     *	           () => console.log('Authentication Complete')
     *	       );
     */
    HttpService.prototype.postSimple = function (url, body) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.post(url, body, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.js.map