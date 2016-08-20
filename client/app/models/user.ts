import { Name }	from './name';

export class User {
	_id: number;
	name: Name;
	email: String;
	password: String;
	roles: [ String ];
}
