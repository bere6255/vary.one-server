import { Request, Response } from "express"
import listOrder from "../../service/order/list";
const logPrefix = "ORDER:LIST:CONTROLLER";
export default async (req: Request, res: Response) => {
	try {
		console.log(`${logPrefix} init ===> `);
        const user = req.user;
		
		const {status, statusCode, data, message} = await listOrder(user);

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
			message: "Failed to fetch order, please try again in a few minutes",
			errors: [],
		});

	}
}