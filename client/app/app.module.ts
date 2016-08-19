import { NgModule }				from '@angular/core';
import { BrowserModule }		from '@angular/platform-browser';
import { FormsModule }			from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent }			from './app.component';
// Landing pages.
import { PasswordReset } 		from './components/password-reset/password-reset.component';
import { UserEdit } 			from './components/user-edit/user-edit.component';
import { SiteHome }             from './components/site-home/site-home.component';
// Components.
import { MainMenu }             from './components/main-menu/main-menu';
import { LogIn }                from './components/log-in/log-in.component';

const appRoutes: Routes = [
    {
        path: '',
        component: SiteHome
    },
    {
        path: 'password-reset',
        component: PasswordReset
    },
    {
        path: 'user-edit',
        component: UserEdit
    }
];

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(appRoutes)
	],
	declarations: [ AppComponent, MainMenu, LogIn ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }
