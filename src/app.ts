import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {Repo} from "./repository";
import {RepoList} from "./repo_list"

@Component({
    selector: 'my-app',
    directives: [RepoList],
    template: `
        <div class="container">
          <repo-list [repositories]="repositories"></repo-list>
        </div>
    `,
    styles: [`
        .container {
            max-width:700px;
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
