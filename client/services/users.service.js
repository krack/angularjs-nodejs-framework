var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { CrudService } from './crud-service.service';
var UsersService = (function (_super) {
    __extends(UsersService, _super);
    function UsersService(baseApi, http) {
        var _this = _super.call(this, baseApi + 'users/', http) || this;
        _this.baseApi = baseApi;
        return _this;
    }
    UsersService.prototype.getConnectedUser = function () {
        var _this = this;
        if (!this.connectedUser) {
            this.connectedUser = new Observable(function (observer) {
                observer.next(null);
                _this.http.get(_this.baseApi + 'me', _this.options)
                    .map(_this.extractData)
                    .subscribe(function (result) {
                    observer.next(result);
                }, function (error) { return observer.error(error.status); });
            });
        }
        return this.connectedUser;
    };
    return UsersService;
}(CrudService));
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [String, Http])
], UsersService);
export { UsersService };
//# sourceMappingURL=/home/krack/projects/angularjs-nodejs-framework/client/services/users.service.js.map