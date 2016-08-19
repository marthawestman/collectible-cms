import { Injectable }									from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs }  from '@angular/http';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }
    get(url: string) {
    	return this.http.get(url);
    }
    /**
     * Issue post request and return raw http response in observable.
     *
     * @example
     *	   var authenticate = { email: email, password: password };
     *     var headers = new Headers();
  	 *     headers.append('Content-Type', 'application/json');
	 *	   return this.httpService.post('/api/v1/authenticate', JSON.stringify(authenticate), { headers: headers })
     *         .map( (res) => { return res.json(); })
	 *         .map( (res) => { return res.token; })
	 *         .subscribe(
	 *		       token => console.log("token " + token),
	 *	           err => console.log("error " + err),
	 *	           () => console.log('Authentication Complete')
	 *	       );
	 */
    post(url: string, body: any, options?: RequestOptionsArgs) {
    	return this.http.post(url, body, options);
    }
    /**
     * Issue post request with 'applicaton/json' header and return deserialized
     * json response in observable.
     *
     * @example
     *	   var authenticate = { email: email, password: password };
	 *	   return this.httpService.postSimple('/api/v1/authenticate', JSON.stringify(authenticate))
	 *         .map( (json) => { return json.token; })
	 *         .subscribe(
	 *		       token => console.log("token " + token),
	 *	           err => console.log("error " + err),
	 *	           () => console.log('Authentication Complete')
	 *	       );
	 */
    postSimple(url: string, body: any) {
    	var headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	return this.post(url, body, { headers: headers })
    		.map( (res) => { return res.json(); })
    }
}
