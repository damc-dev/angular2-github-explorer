/**
 * Created by David on 12/2/2015.
 */

export class Owner {
    id: number;
    name: string;
    url: string;
    avatar_url: string;
}

export class Repo {
    id:number;
    name:string;
    full_name:string;
    owner:Owner;
    url:string;
    language: string;
    description: string;
    stargazers_count:number;
}
