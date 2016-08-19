import { Component }    from '@angular/core';
import { OnInit }       from '@angular/core';
import { Headers }		from '@angular/http';
import { User }         from '../../models/user';
import { UserService }  from '../../services/user/user';
import { AuthenticateService }	from '../../services/authenticate/authenticate.service';

@Component({
    selector: 'log-in',
    templateUrl: 'app/components/log-in/log-in.html',
    styleUrls: ['app/components/log-in/log-in.css'],
})

export class LogIn implements OnInit {
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
