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
	};
	hasRole(role: string) : boolean {
		var hasRole = false;
		if (this.isRegistered() && this.roles.indexOf(role) > -1) {
			hasRole = true;
		}
		return hasRole;
	}
	isAdmin(): boolean {
		return this.hasRole('admin');
	}
}
