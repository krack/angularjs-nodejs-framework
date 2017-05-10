import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CrudService } from '../services/crud-service.service';
import { IdentifiedElement } from '../services/indentified-element';
import { ErrorComponent } from './error-component';




export class ListElements<T extends IdentifiedElement> extends ErrorComponent implements OnInit {
  private elements: T[];
  protected crudService : CrudService<T>;

  constructor (serviceCrud: CrudService<T>, router:Router, route: ActivatedRoute) {
    super(router,route);
    this.crudService = serviceCrud;
  }
  
  ngOnInit() { 
    this.initList();
  }

   initList() {
    this.crudService.getAlls()
    .subscribe(
      list => this.elements = list,
      error =>  this.manageError(error)
     );
  }

  deleteElement(event, element:T) {
    this.crudService.deleteById(element._id)
    .subscribe(
      result => this.elements = this.elements.filter(el => el._id != element._id),
      error =>  this.manageError(error)
      );
    event.preventDefault();
  }

}
