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
    userId: string;
    working: boolean = false;
    users : User;
    constructor(private route: ActivatedRoute, private userService: UserService) {
        this.userId = route.snapshot.params['id'];        
    }
    ngOnInit() {
        this.working = true;
    }
};
