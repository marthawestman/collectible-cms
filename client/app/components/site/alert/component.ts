import { Component }     from '@angular/core';
import { OnInit }        from '@angular/core';
import { Input }         from '@angular/core';
import { AlertMessage }  from '../../../models/alertMessage';

@Component({
	moduleId: module.id,
    selector: 'cc-site-alert',
    templateUrl: 'view.html',
    styleUrls: ['style.css'],
})

export class SiteAlertComponent implements OnInit {
    @Input() alerts: AlertMessage[]
    constructor() { }
    dismiss() {
        
    }
    ngOnInit() {
    }
};
