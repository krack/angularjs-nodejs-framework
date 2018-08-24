import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
var CrudService = /** @class */ (function () {
    function CrudService(url, http) {
        this.http = http;
        this.url = url;
        var headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: headers, withCredentials: true });
    }
    CrudService.prototype.getAlls = function () {
        return this.http.get(this.url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CrudService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body || {};
    };
    CrudService.prototype.handleError = function (error) {
        /* // In a real world app, we might use a remote logging infrastructure
         let errMsg: string;
         if (error instanceof Response) {
           const body = error.json() || '';
           const err = body.error || JSON.stringify(body);
           errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
         } else {
           errMsg = error.message ? error.message : error.toString();
         }
         console.error(errMsg);*/
        return Observable.throw(error.status);
    };
    CrudService.prototype.getById = function (id) {
        return this.http.get(this.url + id, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CrudService.prototype.add = function (element) {
        return this.http.post(this.url, element, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CrudService.prototype.updateElement = function (element) {
        return this.http.put(this.url + element._id, element, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CrudService.prototype.deleteById = function (id) {
        return this.http.delete(this.url + id, this.options);
    };
    return CrudService;
}());
export { CrudService };
//# sourceMappingURL=/home/krack/projects/angularjs-nodejs-framework/client/services/crud-service.service.js.map