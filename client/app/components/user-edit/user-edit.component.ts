import { Component }                    from '@angular/core';
import { OnInit }                       from '@angular/core';
import { Http, Headers, Response }      from '@angular/http';
import { User }                         from '../../models/user';
import { UserService }                  from '../../services/user/user';

@Component({
    selector: 'user-edit',
    templateUrl: 'app/components/user-edit/user-edit.html',
    styleUrls: ['app/components/user-edit/user-edit.css'],
    directives: [],
    providers: [ UserService ]
})

export class UserEdit implements OnInit {
    title: string;
    working: boolean = false;
    users : User[];
    constructor(private http: Http, private userService: UserService) {
        this.title = 'Edit User';
    }
    saveUser() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.working = true;
    }
    ngOnInit() {
        this.users = this.userService.getUsers(true);
    }
};
