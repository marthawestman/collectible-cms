import { NgModule }				         from '@angular/core';
import { BrowserModule }		         from '@angular/platform-browser';
import { FormsModule }			         from '@angular/forms';
import { Routes, RouterModule }          from '@angular/router';
import { AppComponent }			         from './app.component';
// Routes, Landing pages.
import { PasswordReset } 		         from './components/password-reset/password-reset.component';
import { RoutesSiteHomeComponent }       from './routes/site/home/component';
import { RoutesUsersProfileComponent }   from './routes/users/profile/component';
// Components.
import { AlertComponent }                from './components/alert/alert';
import { MainMenu }                      from './components/main-menu/main-menu.component';
import { LogIn }                         from './components/log-in/log-in.component';
import { UsersListsAllComponent }        from './components/users/lists/all/all.component';
import { UsersCreateQuickComponent }     from './components/users/create/quick/quick.component';

const appRoutes: Routes = [
    { path: '', component: RoutesSiteHomeComponent },
    { path: 'password-reset', component: PasswordReset },
    { path: 'u/:id', component: RoutesUsersProfileComponent }
];

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(appRoutes)
	],
	declarations: [ 
        AppComponent, 
        AlertComponent,
        MainMenu, 
        LogIn,
        UsersListsAllComponent,
        UsersCreateQuickComponent
    ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }
