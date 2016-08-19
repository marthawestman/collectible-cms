import { Injectable }									from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs }  from '@angular/http';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }
    get(url: string, options?: RequestOptionsArgs) {
    	return this.http.get(url, options);
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
     * Issue post request with 'applicaton/json', and x-access-token header and
     * return deserialized json response in observable.
     *
     * @param string url
     *    Endpoint to issue request against.
     * @param object body
     *    An object to JSON.stringify and submit as body content.
     * @param string token (optional)
     *    The token to attach to authenticate api access.
     *
     * @example
     *	   var authenticate = { email: email, password: password };
	 *	   return this.httpService.postSimple('/api/v1/authenticate', authenticate)
	 *         .map( (json) => { return json.token; })
	 *         .subscribe(
	 *		       token => console.log("token " + token),
	 *	           err => console.log("error " + err),
	 *	           () => console.log('Authentication Complete')
	 *	       );
	 */
    postSimple(url: string, body: any, token?: string) {
    	var headers = new Headers();
    	headers.append('Content-Type', 'application/json');
        if (token) {
            headers.append('x-access-token', token);
        }
    	return this.post(url, JSON.stringify(body), { headers: headers })
    		.map( (res) => { return res.json(); })
    }
    /**
     * Issue get request with x-access-token header and return deserialized
     * json response in observable.
     *
     * @param string url
     *    Endpoint to issue request against.
     * @param string token (optional)
     *    The token to attach to authenticate api access.
     *
     * @example
     */
    getSimple(url: string, token?: string) {
        var headers = new Headers();
        if (token) {
            headers.append('x-access-token', token);
        }
        return this.get(url, { headers: headers })
            .map( (res) => { return res.json(); })
    }
}
