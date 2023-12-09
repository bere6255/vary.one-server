"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const objection_1 = require("objection");
class User extends objection_1.Model {
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
        return {};
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
exports.default = User;
