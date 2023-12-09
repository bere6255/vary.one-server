import { Model } from "objection"

class Orders extends Model {
	// Table name is the only required property.
	static get tableName() {
		return "orders";
	}

	static get idColumn() {
		return "id";
	}
}

export default Orders;