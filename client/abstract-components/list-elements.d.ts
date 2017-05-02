import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud-service.service';
import { IdentifiedElement } from '../services/indentified-element';
import { ErrorComponent } from './error-component';
export declare class ListElements<T extends IdentifiedElement> extends ErrorComponent implements OnInit {
    private elements;
    protected crudService: CrudService<T>;
    constructor(serviceCrud: CrudService<T>, router: Router);
    ngOnInit(): void;
    initList(): void;
    deleteElement(event: any, element: T): void;
}
