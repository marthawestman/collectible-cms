import { NgModule }				from '@angular/core';
import { BrowserModule }		from '@angular/platform-browser';
import { FormsModule }			from '@angular/forms';
import { AppComponent }			from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { PasswordReset } 		from './components/password-reset/password-reset.component';
import { UserEdit } 			from './components/user-edit/user-edit.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/user-edit',
        pathMatch: 'full'
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
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }
