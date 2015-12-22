import {Component, Output, EventEmitter} from 'angular2/core';
import {SearchCriteria} from './search_criteria';
@Component({
  selector: 'search-form',
  template: `
  <div class="panel panel-default">
    <div class="panel-body">
      <form (ngSubmit)="search()">
        <div class="input-group">
          <input type="text" class="form-control" [(ngModel)]="containsCriteria">
          <div class="input-group-btn">
            <button class="btn btn-default" (click)="search()"><span class="glyphicon glyphicon-search"></span></button>
            <button class="btn btn-default" (click)="clearSearch()"><span class="glyphicon glyphicon-remove"></span></button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
  })

export class SearchForm {
  @Output() searchCriteria = new EventEmitter<SearchCriteria>();
  containsCriteria: string = '';

  search() {
      this.searchCriteria.next({contains:this.containsCriteria});
  }
  clearSearch() {
    this.searchCriteria.next({contains:null});
    this.containsCriteria = "";

  }

}
