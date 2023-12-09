import Products from "../../entity/models/Products"

const logPrefix ="[PRODUCTS:LIST:SERVICE]";

export default async () => {
	try {
        // feach products details
		const products = await Products.query()
			.whereNull("deleted_at");
		return { status: true, statusCode: 200, data: products, message: "Products fetch successful" }
	} catch (error: any) {
		console.log(`${logPrefix} error ===>`, error.message, error.stack);
		return { status: false, statusCode: 401, data: {}, message: "Products fetch failed, please try again shortly " }
	}
}