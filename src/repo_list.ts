import {Component, Input} from 'angular2/core';
import {Repo} from './repository'
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'repo-list',
  directives: [CORE_DIRECTIVES],
  template: `
  <div class="repositories">
      <h1>Starred Repositories</h1>
      <div class="repository media" *ngFor="#repo of repositories">
          <div class="media-left">
              <a href="#">
                  <img class="avatar" [src]="repo.owner.avatar_url" />

              </a>
          </div>
          <div class="media-body">

              <h4 class="media-heading">
                  <a href="{{repo.owner.url}}">{{repo.owner.name}}</a> / <a href="{{repo.url}}" >{{repo.name}}</a>
                  <small>
                      <div class="star-count">
                          <span class="glyphicon glyphicon-star"></span> {{repo.stargazers_count}}
                      </div>
                  </small>
              </h4>
              <p>{{repo.description}}</p>
          </div>
     </div>
  </div>
  `,
  styles: [`
      .avatar {
          width:75px;
          height:75px;
      }
      .star-count {
          float: right;
      }
  `]
})

export class RepoList {
  @Input() repositories: Repo[];
}
