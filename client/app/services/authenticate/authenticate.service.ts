import { Injectable }	from '@angular/core';
import { Headers }		from '@angular/http';
import { HttpService }	from '../http/http';

@Injectable()
export class AuthenticateService {
    constructor(private httpService: HttpService) { }
    /**
     * @example
     *     AuthService.authenticate(name, password)
     *     .subscribe(
     *         token => console.log("success: " + token),
     *         err => console.log("error: " + err),
     *         () => console.log('Authentication Complete')
     *     );
     */
    authenticate(email: string, password: string) {
    	var authenticate = {
    		email: email,
    		password: password
    	};
        var headers = new Headers();
  	    headers.append('Content-Type', 'application/json');
		return this.httpService.post('/api/v1/authenticate', JSON.stringify(authenticate), {
		    headers: headers
		}).map( (res) => {
            return res.json();
        }).map( (res) => {
            return res.token;
        });
    }
    getToken() {
    	return localStorage.getItem('token');
    }
    setToken(token: string) {
		if (token) {
			localStorage.setItem('token', token);
		}
    }
}
