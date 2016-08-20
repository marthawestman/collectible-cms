import { Name }	from './name';

export class User {
	_id: string;
	name: Name;
	email: string;
	password: string;
	roles: [ string ];
	isRegistered(): boolean {
		if (this._id != null && this._id != "0") {
			return true;
		}
		return false;
	}
}
