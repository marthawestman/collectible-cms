import { Component }                     from '@angular/core';
import { OnInit }                        from '@angular/core';
import { User }                          from '../../models/user';
import { UserService }                   from '../../services/user/user.service';
import { AuthenticateService }	         from '../../services/authenticate/authenticate.service';

@Component({
    moduleId: module.id,
    selector: 'cc-login',
    templateUrl: 'view.html',
    styleUrls: ['style.css'],
})

export class LoginComponent implements OnInit {
	name: string;
	password: string;
    constructor(private authService: AuthenticateService, private userService: UserService) { }
    logIn() {
    	this.authService.authenticate(this.name, this.password)
	    .subscribe(
			token => this.success(token),
		    err => this.failure(err),
		    () => console.log('Authentication Complete')
		);
    }
    success(token) {
		this.authService.setToken(token);
		alert('Authenticated!');
    }
    failure(err) {
    	console.log(err);
    	alert(err);
    }
    ngOnInit() {
    }
};
