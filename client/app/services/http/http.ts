import { Injectable }					from '@angular/core';
import { Http, Headers, Response }      from '@angular/http';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }
    get(url: string) {
    	return this.http.get(url);
    }
}
