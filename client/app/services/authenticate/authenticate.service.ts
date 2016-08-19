import { Injectable }	from '@angular/core';
import { Headers }		from '@angular/http';
import { HttpService }	from '../http/http';

@Injectable()
export class AuthenticateService {
    constructor(private httpService: HttpService) { }
    authenticate(email: string, password: string) {
    	var authenticate = {
    		email: email,
    		password: password
    	};
        var headers = new Headers();
  	    headers.append('Content-Type', 'application/json');
		return this.httpService.post('/api/v1/authenticate', JSON.stringify(authenticate), {
		    headers: headers
		});
    }
    getToken() {
    	return localStorage.getItem('token');
    }
    putToken(token) {
		if (token) {
			localStorage.setItem('token', token);
		}
    }
}
