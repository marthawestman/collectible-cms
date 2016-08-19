import { Injectable }	from '@angular/core';
import { User }			from '../../models/user';
import { USERS }		from '../../mocks/user';
import { HttpService }	from '../http/http.service';
import { AuthenticateService }	from '../authenticate/authenticate.service';

@Injectable()
export class UserService {
    constructor(private httpService: HttpService, private authService: AuthenticateService) { }
    /**
     * Retrieve all users.
     *
     * @example
     *     UserService.getUsers()
     *     .subscribe(
     *         users => console.log('success: ' + users),
     *         err => console.log('error: ' + err),
     *         () => console.log('Request Complete')
     *     );
     */
	getUsers() {
		return this.httpService.getSimple('/api/v1/user', localStorage.getItem('token'))
            .map( (json) => { return json.data; });
	}
}
