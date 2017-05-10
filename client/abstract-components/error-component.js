var ErrorComponent = (function () {
    function ErrorComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    ErrorComponent.prototype.manageError = function (status) {
        if (status == '401') {
            console.log(this.route);
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