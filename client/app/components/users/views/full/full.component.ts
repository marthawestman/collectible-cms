import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute }           from '@angular/router';
import { User }                     from '../../../../models/user';
import { UserService }              from '../../../../services/user/user.service';

@Component({
    selector: 'users-views-full',
    templateUrl: 'app/components/users/views/full/full.html',
    styleUrls: ['app/components/users/views/full/full.css'],
})

export class UsersViewsFullComponent implements OnInit {
    working: boolean = false;
    loaded: boolean = false;
    userId: string;
    user : User;
    constructor(private route: ActivatedRoute, private userService: UserService) {
        this.userId = route.snapshot.params['id'];        
    }
    ngOnInit() {
        this.working = true;
        this.userService.read(this.userId)
            .subscribe(
                user => {
                    this.user = user;
                    this.loaded = true;
                },
                err => console.log('error: ' + err),
                () => this.working = false
            );
    }
};
