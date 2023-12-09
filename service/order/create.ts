import Orders from "../../entity/models/Orders"
import Products from "../../entity/models/Products"
type create = {
    user: any;
	product_id: string;
	qty: number;
}
const logPrefix ="[ORDER:CREATE:SERVICE]";

export default async ({user, product_id, qty}: create) => {
	try {
		// check if product exist
		const getProdut = await Products.query().findOne({id: product_id});
		if (!getProdut) {
			console.log(`${logPrefix} product not found id: ${product_id} user: ${user.id}`);
			
			return { status: false, statusCode: 401, data: {}, message: "product not found"}
		}
		// other business logics
		
        // create orders with product details
		const orders = await Orders.query().insertAndFetch({ 
			user_id: user.id,
			product_id,
			qty,
			created_at: new Date(),
			updated_at: new Date(),
		 })
			.whereNull("deleted_at");
		return { status: true, statusCode: 200, data: orders, message: "Order placed successful, please proceed to payment" }
	} catch (error: any) {
		console.log(`${logPrefix} error ===>`, error.message, error.stack);
		return { status: false, statusCode: 401, data: {}, message: "Order failed, please try again shortly " }
	}
}