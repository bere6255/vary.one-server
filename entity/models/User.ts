require("dotenv").config()
import { Model } from "objection"

class User extends Model {
	id: any;
	fullName: any;
	email: any;
	avatar: any;
	password: any;
	email_verified_at: any;
    created_at: any;
	banned_at: any;
	deleted_at: any;
	updated_at: any;
	static theTableName() {
		return "users";
	}

	// Table name is the only required property.
	static get tableName() {
		return this.theTableName();
	}

	static get idColumn() {
		return "id";
	}

	static get relationMappings() {

		return {
			
		};
	}

	user() {
		return {
			id: this.id,
			fullName: this.fullName,
			email: this.email,
			avatar: !this.avatar ? null : this.avatar,
			email_verified_at: this.email_verified_at ? true : false,
			created_at: this.created_at,
			banned_at: this.banned_at,
			updated_at: this.updated_at,
		};
	}

}

export default User;