import { Component }	    from '@angular/core';
import { OnInit }		    from '@angular/core';
import { AlertMessage }     from '../../models/alertMessage';

@Component({
    selector: 'site-home',
    templateUrl: 'app/components/site-home/site-home.html',
    styleUrls: ['app/components/site-home/site-home.css'],
})

export class SiteHome implements OnInit {
	alerts: AlertMessage[] = [];
    constructor() { }
    ngOnInit() {
    }
};
