import { Component }	    from '@angular/core';
import { OnInit }		    from '@angular/core';
import { AlertMessage }     from '../../../models/alertMessage';
import { User }				from '../../../models/user';
import { UserService }		from '../../../services/user/user.service';

@Component({
    moduleId: module.id,	
    selector: 'cc-routes-site-home',
    templateUrl: 'view.html',
    styleUrls: ['style.css'],
})

export class RoutesSiteHomeComponent implements OnInit {
	alerts: AlertMessage[] = [];
	currentUser: User = null;
    constructor(private userService: UserService) {
    }
    ngOnInit() {
    	this.currentUser = this.userService.getCurrentUser();
    	console.log(this.currentUser);
    }
};
