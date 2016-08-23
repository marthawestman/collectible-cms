import { Component }			         from '@angular/core';
import { OnInit, Input }   				 from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs }  from '@angular/http';
import { Observable }                    from 'rxjs/Observable';
import { User, CurrentUser } 			 from '../../../models/user';
import { AlertMessage }                  from '../../../models/alertMessage';
import { AuthenticateService }           from '../../../services/authenticate/authenticate.service';
import { HttpService }                   from '../../../services/http/http.service';

@Component({
	moduleId: module.id,
    selector: 'cc-site-upload',
    templateUrl: 'view.html',
    styleUrls: ['style.css'],
})
export class SiteUploadComponent implements OnInit {
    @Input() alerts: AlertMessage[];
    files: File[];
	currentUser: CurrentUser;
    working: boolean = false;
    loaded: boolean = false;
    constructor(private authService: AuthenticateService, private httpService: HttpService) { 
        this.currentUser = this.authService.getCurrentUser();
    }
    fileChange(fileInput: any) {
        this.files = <Array<File>> fileInput.target.files;
    }
    save() {
        let url: string = 'api/v1/file';
        let formData: FormData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
            formData.append("uploads[]", this.files[i], this.files[i].name);
        }
        this.httpService.postSimple(url, formData, this.authService.getToken()).subscribe(
            res => {
                this.alerts.push({ type: 'success', message: res });
                console.log(res);
            },
            err => {
                this.alerts.push({ type: 'error', message: err });
                console.log(err);
            },
            () => { }
        );

    }
    ngOnInit() {
    }
};
