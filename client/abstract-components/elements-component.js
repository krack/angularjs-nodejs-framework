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
import { ErrorComponent } from './error-component';
var ElementComponent = (function (_super) {
    __extends(ElementComponent, _super);
    function ElementComponent(baseView, serviceCrud, router, route) {
        var _this = _super.call(this, router, route) || this;
        _this.route = route;
        _this.crudService = serviceCrud;
        _this.baseView = baseView;
        return _this;
    }
    ElementComponent.prototype.ngOnInit = function () {
    };
    ElementComponent.prototype.initElementFromUrlParameter = function () {
        var _this = this;
        return new Observable(function (observer) {
            _this.route.params.subscribe(function (params) {
                var id = params['id'];
                if (id) {
                    _this.crudService.getById(id)
                        .subscribe(function (element) {
                        _this.element = element;
                        observer.next(null);
                    }, function (error) { return _this.manageError(error); });
                }
            });
        });
    };
    ;
    ElementComponent.prototype.saveElement = function () {
        var _this = this;
        if (this.element._id) {
            this.crudService.updateElement(this.element)
                .subscribe(function (element) { return console.log("ok"); }, function (error) { return _this.manageError(error); });
        }
        else {
            this.crudService.add(this.element)
                .subscribe(function (element) { return _this.router.navigate([_this.baseView + '/' + element._id]); }, function (error) { return _this.manageError(error); });
        }
    };
    ElementComponent.prototype.deleteElement = function (event) {
        var _this = this;
        this.crudService.deleteById(this.element._id)
            .subscribe(function (result) {
            var i = _this.listOfElement.findIndex(function (el) { return el._id === _this.element._id; });
            _this.listOfElement.splice(i, 1);
        });
        event.preventDefault();
    };
    return ElementComponent;
}(ErrorComponent));
export { ElementComponent };
//# sourceMappingURL=/home/krack/projects/angularjs-nodejs-framework/client/abstract-components/elements-component.js.map