var ErrorComponent = (function () {
    function ErrorComponent(router) {
        this.router = router;
    }
    ErrorComponent.prototype.manageError = function (status) {
        if (status === '401') {
            this.router.navigate(['/login']);
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    return ErrorComponent;
}());
export { ErrorComponent };
//# sourceMappingURL=/home/krack/projects/angularjs-nodejs-framework/client/abstract-components/error-component.js.map