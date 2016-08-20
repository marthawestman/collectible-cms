import { Component }     from '@angular/core';
import { OnInit }        from '@angular/core';
import { Input }         from '@angular/core';
import { AlertMessage }  from '../../models/alertMessage';

@Component({
    selector: 'cc-alert',
    templateUrl: 'app/components/alert/alert.html',
    styleUrls: ['app/components/alert/alert.css'],
})

export class AlertComponent implements OnInit {
    @Input() alerts: AlertMessage[]
    constructor() { }
    dismiss() {
        
    }
    ngOnInit() {
    }
};
