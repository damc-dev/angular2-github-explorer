import {Component, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {Repo} from "./repository";

@Component({
    selector: 'my-app',
    directives: [CORE_DIRECTIVES],
    template: `
        <div class="container">
            <div class="repositories">
                <h1>Starred Repositories</h1>
                <div class="repository media" *ng-for="#repo of repositories">
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
                                    <span class="glyphicon glyphicon-star"/> {{repo.stargazers_count}}
                                </div>
                            </small>
                        </h4>
                        <p>{{repo.description}}</p>
                    </div>
               </div>
            </div>
        </div>
    `,
    styles: [`
        .container {
            max-width:700px;
         }
        .avatar {
            width:75px;
            height:75px;
        }
        .star-count {
            float: right;
        }
    `]
})
export class AppComponent {
    repositories: Array<Repo> = [];
    http:Http;

    constructor(http:Http) {
        this.http = http;
        this.getFavoritedRepositories();
    }

    getFavoritedRepositories() {
        //noinspection TypeScriptUnresolvedFunction
        this.http.get("https://api.github.com/users/damc-dev/starred?per_page=100").subscribe(
            data => {
                console.log(data);
                var results = data.json();
                for(var i=0; i < results.length; i++) {
                    var repo = results[i];
                    var repository = {
                        id: repo.id,
                        name: repo.name,
                        full_name: repo.full_name,
                        url: repo.html_url,
                        owner: {
                            id: repo.owner.id,
                            name: repo.owner.login,
                            url: repo.owner.html_url,
                            avatar_url: repo.owner.avatar_url
                        },
                        description: repo.description,
                        stargazers_count: repo.stargazers_count
                    };
                    this.repositories.push(repository);
                }
            }
        );
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);