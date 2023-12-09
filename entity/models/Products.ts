import { Model } from "objection"

class Products extends Model {
	// Table name is the only required property.
	static get tableName() {
		return "products";
	}

	static get idColumn() {
		return "id";
	}
}

export default Products;