var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(router) {
        this.router = router;
    }
    ErrorComponent.prototype.manageError = function (status) {
        if (status == '401') {
            localStorage.setItem('last-url-error', this.router.url);
            this.router.navigate(['/login']);
        }
        else {
            console.log("error " + status);
        }
    };
    return ErrorComponent;
}());
export { ErrorComponent };
//# sourceMappingURL=/home/krack/projects/angularjs-nodejs-framework/client/abstract-components/error-component.js.map