import { Component }       from '@angular/core';
import { OnInit }          from '@angular/core';
import { User }            from '../../models/user';
import { UserService }     from '../../services/user/user.service';

@Component({
    selector: 'main-menu',
    templateUrl: 'app/components/main-menu/main-menu.html',
    styleUrls: ['app/components/main-menu/main-menu.css'],
})

export class MainMenu implements OnInit {
    constructor(private userService: UserService) { }
    ngOnInit() {
    }
};
