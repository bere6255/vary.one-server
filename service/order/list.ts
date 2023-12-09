import Orders from "../../entity/models/Orders"
type list = {
    user: any;
}
const logPrefix ="[ORDER:LIST:SERVICE]";

export default async ({user}: list) => {
	try {
        // feach orders with product details
		const orders = await Orders.query().where({ user_id: user.id })
			.whereNull("deleted_at");
		return { status: true, statusCode: 200, data: orders, message: "Order fetch successful" }
	} catch (error: any) {
		console.log(`${logPrefix} error ===>`, error.message, error.stack);
		return { status: false, statusCode: 401, data: {}, message: "Order fetch failed, please try again shortly " }
	}
}