import { Component }	    from '@angular/core';
import { OnInit }		    from '@angular/core';
import { AlertMessage }     from '../../../models/alertMessage';

@Component({
    moduleId: module.id,	
    selector: 'cc-routes-site-home',
    templateUrl: 'view.html',
    styleUrls: ['style.css'],
})

export class RoutesSiteHomeComponent implements OnInit {
	alerts: AlertMessage[] = [];
    constructor() { }
    ngOnInit() {
    }
};
