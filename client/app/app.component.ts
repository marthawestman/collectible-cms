import { Component }       from '@angular/core';
import { OnInit }          from '@angular/core';
import { Title }           from '@angular/platform-browser';
import { HTTP_PROVIDERS }  from '@angular/http';
import { HttpService }     from './services/http/http';

@Component({
    selector: 'my-app',
    template: `
        <div class="public-app">
            <div class="public-menu">
                <a routerLink="password-reset" routerLinkActive="active">Password Reset</a>
                <a routerLink="user-edit" routerLinkActive="active">User Edit</a>
            </div>
            <div class="public-content">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    providers: [ Title, HTTP_PROVIDERS, HttpService ]
})

export class AppComponent implements OnInit {
    constructor(private titleService: Title) { }
    ngOnInit() {
        this.titleService.setTitle("Collectible CMS 2");
    }
};
