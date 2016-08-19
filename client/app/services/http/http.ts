import { Injectable }									from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs }  from '@angular/http';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }
    get(url: string) {
    	return this.http.get(url);
    }
    post(url: string, body: any, options?: RequestOptionsArgs) {
    	return this.http.post(url, body, options);
    }
}
