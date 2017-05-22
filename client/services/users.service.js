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
export { UsersService };
//# sourceMappingURL=/home/krack/projects/angularjs-nodejs-framework/client/services/users.service.js.map