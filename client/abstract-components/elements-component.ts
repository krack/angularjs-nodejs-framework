import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Observable';

import { CrudService } from '../services/crud-service.service';
import { IdentifiedElement } from '../services/indentified-element';

import { ErrorComponent } from './error-component';




export class ElementComponent<T extends IdentifiedElement> extends ErrorComponent  implements OnInit {
  protected baseView:String;
  protected listOfElement: T[]
  protected element: T;
  protected crudService : CrudService<T>;

  constructor (baseView: String, serviceCrud: CrudService<T>, router:Router, protected route: ActivatedRoute) {
    super(router);
    this.crudService = serviceCrud;
    this.baseView = baseView;
  }
  
  ngOnInit() { 
  }

  initElementFromUrlParameter():Observable<any> {

   return new Observable(observer => {
      this.route.params.subscribe((params: Params) => {
        let id = params['id']
        if(id){
          this.crudService.getById(id)
          .subscribe(
            (element: T) =>{
              this.element = element;
              observer.next(null);
            },
            error=> this.manageError(error)
           );
        }
      });
    });
  };


  saveElement() {
    if(this.element._id){
      this.crudService.updateElement(this.element)
      .subscribe(
          element => console.log("ok"),
          error=> this.manageError(error)
        );
    }else {
      this.crudService.add(this.element)
      .subscribe(
        element => this.router.navigate([this.baseView+'/'+element._id]),
        error=> this.manageError(error)
      );
    }
  }

  deleteElement(event) {
    this.crudService.deleteById(this.element._id)
    .subscribe(
      result => {
        let i = this.listOfElement.findIndex(el => el._id === this.element._id);
        this.listOfElement.splice(i, 1);
      }
    );
    event.preventDefault();
  }




}
