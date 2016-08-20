import { Component }                    from '@angular/core';
import { OnInit }                       from '@angular/core';
import { User }                         from '../../../../models/user';
import { UserService }                  from '../../../../services/user/user.service';

@Component({
    selector: 'users-lists-all',
    templateUrl: 'app/components/users/lists/all/all.html',
    styleUrls: ['app/components/users/lists/all/all.css'],
})

export class UsersListsAllComponent implements OnInit {
    working: boolean = false;
    users : User[];
    constructor(private userService: UserService) { }
    saveUser() {
    }
    ngOnInit() {
        this.working = true;
        this.userService.readAll()
            .subscribe(
                users => { 
                    this.users = users;
                    this.working = false;
                },
                err => console.log('error: ' + err)
            );
    }
};
