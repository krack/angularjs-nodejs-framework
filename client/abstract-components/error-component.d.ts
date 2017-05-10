import { Router, ActivatedRoute } from '@angular/router';
export declare class ErrorComponent {
    protected router: Router;
    protected route: ActivatedRoute;
    constructor(router: Router, route: ActivatedRoute);
    protected manageError(status: String): void;
}
