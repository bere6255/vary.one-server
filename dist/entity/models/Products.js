"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Products extends objection_1.Model {
    // Table name is the only required property.
    static get tableName() {
        return "products";
    }
    static get idColumn() {
        return "id";
    }
}
exports.default = Products;
