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
import { ErrorComponent } from './error-component';
var ListElements = (function (_super) {
    __extends(ListElements, _super);
    function ListElements(serviceCrud, router) {
        var _this = _super.call(this, router) || this;
        _this.crudService = serviceCrud;
        return _this;
    }
    ListElements.prototype.ngOnInit = function () {
        this.initList();
    };
    ListElements.prototype.initList = function () {
        var _this = this;
        this.crudService.getAlls()
            .subscribe(function (list) { return _this.elements = list; }, function (error) { return _this.manageError(error); });
    };
    ListElements.prototype.deleteElement = function (event, element) {
        var _this = this;
        this.crudService.deleteById(element._id)
            .subscribe(function (result) { return _this.elements = _this.elements.filter(function (el) { return el._id != element._id; }); }, function (error) { return _this.manageError(error); });
        event.preventDefault();
    };
    return ListElements;
}(ErrorComponent));
export { ListElements };
//# sourceMappingURL=/home/krack/projects/angularjs-nodejs-framework/client/abstract-components/list-elements.js.map