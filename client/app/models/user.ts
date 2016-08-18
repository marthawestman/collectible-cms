import { Name }	from './name';

export class User {
	id: number;
	name: Name;
	email: String;
	password: String;
	roles: [ String ];
}
