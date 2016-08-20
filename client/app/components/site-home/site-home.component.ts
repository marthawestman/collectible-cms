import { Component }	 from '@angular/core';
import { OnInit }		 from '@angular/core';
import { ComponentError} from '../../models/componentError';

@Component({
    selector: 'site-home',
    templateUrl: 'app/components/site-home/site-home.html',
    styleUrls: ['app/components/site-home/site-home.css'],
})

export class SiteHome implements OnInit {
	errors: ComponentError[] = [];
    constructor() { }
    ngOnInit() {
    }
};
