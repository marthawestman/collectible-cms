import { Component, OnInit }             from '@angular/core';
import { ActivatedRoute }                from '@angular/router';
import { User, CurrentUser }             from '../../../models/user';
import { AlertMessage }                  from '../../../models/alertMessage';
import { UserService }                   from '../../../services/user/user.service';
import { AuthenticateService }           from '../../../services/authenticate/authenticate.service';

@Component({
    moduleId: module.id,
    selector: 'cc-routes-users-edit',
    templateUrl: 'view.html',
    styleUrls: ['style.css'],
})

export class RoutesUsersEditComponent implements OnInit {
    currentUser: CurrentUser;
	alerts: AlertMessage[] = [];
    working: boolean = false;
    loaded: boolean = false;
    userId: string;
    user : User;
    constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthenticateService) {
        this.userId = route.snapshot.params['id'];        
        this.currentUser = authService.getCurrentUser();
    }
    changePermission(role: string) {
        var index: number = this.user.roles.indexOf(role);
        if (index > -1) {
            this.user.roles.splice(index, 1);
        } else {
            this.user.roles.push(role);
        }
    }
    save() {
        this.alerts.push({ type: 'error', message: 'Not implemented.' });
    }
    ngOnInit() {
        this.working = true;
        this.userService.read(this.userId)
            .subscribe(
                user => {
                    this.user = user;
                    this.loaded = true;
                },
                err => this.alerts.push({ type: 'error', message: err }),
                () => this.working = false
            );
    }
};
