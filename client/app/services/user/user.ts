import { Injectable }	from '@angular/core';
import { User }			from '../../models/user';
import { USERS }		from '../../mocks/user';
import { HttpService }	from '../http/http';

@Injectable()
export class UserService {
    constructor(private httpService: HttpService) { }
	getUsers(mock: boolean) {
		if (mock) {
			return USERS;
		}
      	// return this.httpService.get('/api/user');
	}
}
