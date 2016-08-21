import { Component }       from '@angular/core';
import { OnInit }          from '@angular/core';
import { User }            from '../../../../models/user';
import { UserService }     from '../../../../services/user/user.service';

@Component({
	moduleId: module.id,
    selector: 'cc-site-menu-main',
    templateUrl: 'view.html',
    styleUrls: ['style.css'],
})

export class SiteMenuMainComponent implements OnInit {
	currentUser: User;
    constructor(private userService: UserService) { }
    ngOnInit() {
    	this.currentUser = this.userService.getCurrentUser();
    }
};
