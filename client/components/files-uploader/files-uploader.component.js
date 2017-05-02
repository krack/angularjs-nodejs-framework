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
import { Http, Headers, RequestOptions } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { UUID } from 'angular2-uuid';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
var FilesUploaderComponent = (function () {
    function FilesUploaderComponent(http, domSanitizer) {
        this.http = http;
        this.domSanitizer = domSanitizer;
        this.uuid = UUID.UUID();
        var headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: headers, withCredentials: true });
    }
    FilesUploaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader = new FileUploader({
            url: this.endpoint,
            autoUpload: true
        });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this.list.push(JSON.parse(response));
        };
    };
    FilesUploaderComponent.prototype.deleteFile = function (event, file) {
        var _this = this;
        this.http.delete(this.endpoint + file._id, this.options)
            .subscribe(function (result) {
            var i = _this.list.findIndex(function (el) { return el._id === file._id; });
            _this.list.splice(i, 1);
        });
        event.preventDefault();
    };
    FilesUploaderComponent.prototype.photoURL = function (url) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    };
    return FilesUploaderComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], FilesUploaderComponent.prototype, "list", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FilesUploaderComponent.prototype, "endpoint", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], FilesUploaderComponent.prototype, "readonly", void 0);
FilesUploaderComponent = __decorate([
    Component({
        selector: 'files-uploader',
        templateUrl: './files-uploader.component.html',
        styleUrls: ['./files-uploader.component.scss'],
        providers: [FileSelectDirective]
    }),
    __metadata("design:paramtypes", [Http, DomSanitizer])
], FilesUploaderComponent);
export { FilesUploaderComponent };
//# sourceMappingURL=/home/krack/projects/angularjs-nodejs-framework/client/components/files-uploader/files-uploader.component.js.map