import Products from "../../entity/models/Products"
type create = {
    name: string;
	type: string;
	writer: string;
	avatar: string;
	description: string;
	units: string;
}
const logPrefix ="[PRODUCTS:CREATE:SERVICE]";

export default async (payload: create) => {
	try {

		// other business logics
		
        // create orders with product details
		const product = await Products.query().insertAndFetch({ 
			...payload,
			created_at: new Date(),
			updated_at: new Date(),
		 })
			.whereNull("deleted_at");
		return { status: true, statusCode: 200, data: product, message: "Product created successfully" }
	} catch (error: any) {
		console.log(`${logPrefix} error ===>`, error.message, error.stack);
		return { status: false, statusCode: 401, data: {}, message: "Product creation failed, please try again shortly " }
	}
}