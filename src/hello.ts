import {Component, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {Repo} from "./repository";

@Component({
    selector: 'hello-app',
    directives: [CORE_DIRECTIVES],
    template: `
        <h1>Favorited Repositories</h1>
        <div class="repositories">
            <div class="repository" *ng-for="#repo of repositories">
               <div class="user">
                <img class="avatar" [src]="repo.owner.avatar_url" />
                <h4>{{repo.owner.name}}</h4>
               </div>
                <h3>{{repo.name}}</h3>
                <p>{{repo.description}}</p>
            </div>
        </div>
    `,
    styles: [`

        .repository {
            display:block;
            width: 100%;
            overflow: auto;
            margin: 30px;
        }
        .user {
            width: 30%;
            float:left;
        }
        .avatar {
            width:75px;
            height:75px;
        }

    `]
})
export class HelloApp {
    repositories: Array<Repo> = [];
    name:string = 'World';
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
                        url: repo.url,
                        owner: {
                            id: repo.owner.id,
                            name: repo.owner.login,
                            url: repo.owner.html_url,
                            avatar_url: repo.owner.avatar_url
                        },
                        description: repo.description
                    };
                    console.log(repository);
                    this.repositories.push(repository);
                }
                this.name = data.json()[0].name;
                console.log(this.name);
            }
        );
    }
}

bootstrap(HelloApp, [HTTP_PROVIDERS]);