import { Component }			         from '@angular/core';
import { OnInit, Input }   				 from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs }  from '@angular/http';
import { Observable }                    from 'rxjs/Observable';
import { User, CurrentUser } 			 from '../../../models/user';
import { AlertMessage }                  from '../../../models/alertMessage';
import { AuthenticateService }           from '../../../services/authenticate/authenticate.service';
import { HttpService }                   from '../../../services/http/http.service';
import { FileService }                   from '../../../services/file/file.service';

@Component({
	moduleId: module.id,
    selector: 'cc-site-upload',
    templateUrl: 'view.html',
    styleUrls: ['style.css'],
    providers: [ FileService ]
})
export class SiteUploadComponent implements OnInit {
    @Input() alerts: AlertMessage[];
    file: File;
	currentUser: CurrentUser;
    working: boolean = false;
    loaded: boolean = false;
    constructor(private authService: AuthenticateService, private fileService: FileService) { 
        this.currentUser = this.authService.getCurrentUser();
    }
    fileChange(fileInput: any) {
console.log(fileInput.target);        
        this.file = fileInput.target.files[0];
console.log(this.file);        
    }
    save() {
        this.working = true;
        let formData: FormData = new FormData();
        formData.append("file", this.file);
        this.fileService.create(this.currentUser.user, formData).subscribe(
            file => {
                this.alerts.push({ type: 'success', message: 'File uploaded.' });
                console.log(file);
            },
            err => {
                this.alerts.push({ type: 'error', message: err });
                console.log(err);
            },
            () => { this.working = false; }
        );

    }
    ngOnInit() {
    }
};
