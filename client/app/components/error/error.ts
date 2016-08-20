import { Component }     from '@angular/core';
import { OnInit }        from '@angular/core';
import { Input }         from '@angular/core';
import { ComponentError} from '../../models/componentError';

@Component({
    selector: 'cc-error',
    templateUrl: 'app/components/error/error.html',
    styleUrls: ['app/components/error/error.css'],
})

export class ErrorComponent implements OnInit {
    @Input() errors: ComponentError[]
    constructor() { }
    dismiss() {
        
    }
    ngOnInit() {
    }
};
