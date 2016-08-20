import { Name }	from './name';

export class User {
	_id: string;
	name: Name;
	email: string;
	password: string;
	roles: [ string ];
}
