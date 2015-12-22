import {Component, Input, Output, EventEmitter} from 'angular2/core';
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
      <label>Labels:</label>
      <button class="btn btn-{{isActiveLanguage(language) ? 'primary' : 'default'}}" type="button" *ngFor="#language of languages" (click)="toggleLanguage(language)" >
         {{language}}
      </button>
    </div>
  </div>
  `
  })

export class SearchForm {
  @Input() languages:string[] = [];
  @Output() searchCriteria = new EventEmitter<SearchCriteria>();
  containsCriteria: string = '';
  languageCriteria: string[] = [];

  search() {
      var criteria = {contains:this.containsCriteria, languages:this.languageCriteria};
      this.searchCriteria.next(criteria);
  }

  clearSearch() {
    this.containsCriteria = "";
    this.languageCriteria = [];
    this.search();
  }

  toggleLanguage(language:string) {
    var index = this.languageCriteria.indexOf(language);
    if ( index == -1) {
      this.languageCriteria.push(language);
    } else {
      this.languageCriteria.splice(index, 1)
    }
    this.search();
  }

  isActiveLanguage(language:string) {
    if (this.languageCriteria.indexOf(language) != -1) {
      return true;
    }
    return false;
  }

}
