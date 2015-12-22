import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {Repo} from "./repository";
import {RepoList} from "./repo_list";
import {SearchForm} from "./search_form";
import {SearchCriteria} from "./search_criteria";

@Component({
    selector: 'my-app',
    directives: [RepoList, SearchForm],
    template: `
        <div class="container">
          <h1>Starred Repositories</h1>
          <search-form (searchCriteria)="filterRepos($event)" [languages]="languages"></search-form>
          <repo-list [repositories]="repositories" [searchCriteria]="searchCriteria"></repo-list>
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
    searchCriteria: SearchCriteria;
    languages: string[] = [];
    searchLanguages: string[] = [];
    http:Http;


    constructor(http:Http) {
        this.http = http;
        this.getFavoritedRepositories();
        this.searchCriteria = new SearchCriteria();
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
                        language: repo.language,
                        description: repo.description,
                        stargazers_count: repo.stargazers_count
                    };
                    this.repositories.push(repository);
                    if (repo.language && this.languages.indexOf(repo.language) == -1) {
                      this.languages.push(repo.language);
                    }
                }
            }
        );
    }
    filterRepos(criteria: SearchCriteria) {
      this.searchCriteria = criteria;
      console.log("Filter Repos by: ", this.searchCriteria);
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
