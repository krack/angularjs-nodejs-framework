import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud-service.service';
import { IdentifiedElement } from '../services/indentified-element';
import { ErrorComponent } from './error-component';
export declare class ElementComponent<T extends IdentifiedElement> extends ErrorComponent implements OnInit {
    private route;
    protected listOfElement: T[];
    protected element: T;
    protected crudService: CrudService<T>;
    constructor(serviceCrud: CrudService<T>, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    initElementFromUrlParameter(): void;
    saveElement(): void;
    deleteElement(event: any): void;
}