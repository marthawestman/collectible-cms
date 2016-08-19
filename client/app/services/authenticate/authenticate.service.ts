import { Injectable }	from '@angular/core';
import { Headers }		from '@angular/http';
import { HttpService }	from '../http/http.service';

@Injectable()
export class AuthenticateService {
    constructor(private httpService: HttpService) { }
    /**
     * Request authentication and return JWT in observable.
     *
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
		return this.httpService.postSimple('/api/v1/authenticate', authenticate)
            .map( (json) => { return json.token; });
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
