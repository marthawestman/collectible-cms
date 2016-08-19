import { Component }       from '@angular/core';
import { OnInit }          from '@angular/core';
import { Title }           from '@angular/platform-browser';
import { HTTP_PROVIDERS }  from '@angular/http';
import { HttpService }     from './services/http/http.service';
import { UserService }     from './services/user/user.service';
import { AuthenticateService }  from './services/authenticate/authenticate.service';

@Component({
    selector: 'my-app',
    template: `
        <div class="public-app">
            <main-menu></main-menu>
            <router-outlet></router-outlet>
        </div>
    `,
    providers: [
        Title,
        HTTP_PROVIDERS,
        HttpService,
        UserService,
        AuthenticateService
    ]
})

export class AppComponent implements OnInit {
    constructor(private titleService: Title) { }
    ngOnInit() {
        this.titleService.setTitle("Collectible CMS 2");
    }
};
