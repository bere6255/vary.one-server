import { Request, Response } from "express"
import listProducts from "../../service/products/list";
const logPrefix = "PRODUCTS:LIST:CONTROLLER";
export default async (req: Request, res: Response) => {
	try {
		console.log(`${logPrefix} init ===> `);
		
		const {status, statusCode, data, message} = await listProducts();

		return res.status(statusCode).send({
			status,
			data,
			message,
		});
	} catch (error: any) {
		console.log(`${logPrefix} error ===> `, error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to fetch products, please try again in a few minutes",
			errors: [],
		});

	}
}