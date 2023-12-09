import { Request, Response } from "express"
import createProduct from "../../service/products/create";
import createValidation from "./validations/create";
const logPrefix = "PRODUCTS:CREATE:CONTROLLER";
export default async (req: Request, res: Response) => {
	try {
		console.log(`${logPrefix} init ===> ${JSON.stringify(req.body)}`);
        const { errors, value } = await createValidation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		
		const {status, statusCode, data, message} = await createProduct(value);

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
			message: "Failed to create order, please try again in a few minutes",
			errors: [],
		});

	}
}