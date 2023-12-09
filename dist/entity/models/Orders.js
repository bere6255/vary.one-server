"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Orders extends objection_1.Model {
    // Table name is the only required property.
    static get tableName() {
        return "orders";
    }
    static get idColumn() {
        return "id";
    }
}
exports.default = Orders;
