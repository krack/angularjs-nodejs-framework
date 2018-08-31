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
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ElementComponent } from '../../../abstract-components/elements-component';
;
import { User } from '../../../services/user';
import { UsersService } from '../../../services/users.service';
var UsersListElementComponent = /** @class */ (function (_super) {
    __extends(UsersListElementComponent, _super);
    function UsersListElementComponent(usersService, router, route) {
        return _super.call(this, "/users/", usersService, router, route) || this;
    }
    UsersListElementComponent.prototype.ngOnInit = function () {
        this.listOfElement = this.elements;
    };
    UsersListElementComponent.prototype.switchAdministrator = function () {
        if (this.element.administrator) {
            this.element.administrator = false;
        }
        else {
            this.element.administrator = true;
        }
        this.crudService.updateElement(this.element).subscribe();
    };
    UsersListElementComponent.prototype.removeUser = function () {
        this.crudService.deleteById(this.element._id);
    };
    __decorate([
        Input(),
        __metadata("design:type", User)
    ], UsersListElementComponent.prototype, "element", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], UsersListElementComponent.prototype, "elements", void 0);
    UsersListElementComponent = __decorate([
        Component({
            selector: 'users-list-element',
            templateUrl: './users-list-element.component.html',
            styleUrls: ['./users-list-element.component.scss'],
            providers: [UsersService]
        }),
        __metadata("design:paramtypes", [UsersService, Router, ActivatedRoute])
    ], UsersListElementComponent);
    return UsersListElementComponent;
}(ElementComponent));
export { UsersListElementComponent };
//# sourceMappingURL=/home/krack/projects/angularjs-nodejs-framework/client/components/users/users-list-element/users-list-element.component.js.map