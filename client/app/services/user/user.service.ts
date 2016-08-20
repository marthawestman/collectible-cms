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
     *     UserService.readAll()
     *     .subscribe(
     *         users => console.log('success: ' + users),
     *         err => console.log('error: ' + err),
     *         () => console.log('Request Complete')
     *     );
     */
	readAll() {
		return this.httpService.getSimple('/api/v1/user', localStorage.getItem('token'))
            .map( (json) => { 
                if (!json.status)
                    throw json.message;
                return json.data; 
            });
	}
    /**
     * Retrieve single user.
     *
     * @example
     *     UserService.read(5)
     *     .subscribe(
     *         user => console.log('success: ' + user),
     *         err => console.log('error: ' + err),
     *         () => console.log('Request Complete')
     *     );
     */
    read(userId: string) {
        return this.httpService.getSimple('/api/v1/user/' + userId, localStorage.getItem('token'))
            .map( (json) => { 
                if (!json.status)
                    throw json.message;
                return json.data; 
            });
    }
    /**
     * Create a user. On success a user object will be returned with a populated id field.
     *
     * @example
     *     UserService.create(user)
     *     .subscribe(
     *         user => console.log('success: ' + user._id),
     *         err => console.log('error: ' + err),
     *         () => console.log('Request Complete')
     *     );
     */
    create(user: User) {
        return this.httpService.postSimple('/api/v1/user', user, localStorage.getItem('token'))
            .map( (json) => {
                if (!json.status)
                    throw json.message;
                return json.data
            });
    }
    /**
     * Delete single user.
     *
     * @example
     *     UserService.delete(5)
     *     .subscribe(
     *         () => console.log('success'),
     *         err => console.log('error: ' + err),
     *         () => console.log('Request Complete')
     *     );
     */
    delete(userId: string) {
        return this.httpService.deleteSimple('/api/v1/user/' + userId, localStorage.getItem('token'))
            .map( (json) => { 
                if (!json.status)
                    throw json.message;
                return true; 
            });
    }
}
