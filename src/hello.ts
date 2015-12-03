import {Component, bootstrap} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http} from "/angular2/http";

@Component({
    selector: 'hello-app',
    template: `
        <h1>Hello, {{name}}!</h1>
        Say hello to: <input [value]="name" (input)="name = $event.target.value">
    `
})
export class HelloApp {
    name: string = 'World';
    http: Http;

    constructor(http:Http) {
        this.http = http;
        this.getFavoritedRepositories();
    }

    getFavoritedRepositories() {
        this.http.get("https://api.github.com/users/damc-dev/starred?per_page=100").subscribe(
            data => {
                console.log(data);
                this.name = JSON.stringify(data.json());
                console.log(this.name);
            }
        );
    }
}

bootstrap(HelloApp, [HTTP_PROVIDERS]);