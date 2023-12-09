import { Request, Response } from "express"
import registerValidation from "./validations/register"
import login from "../../service/auth/register";
const logPrefix = "AUTH:REGISTER:CONTROLLER";

export default async (req: Request, res: Response) => {
	try {
		console.log(`${logPrefix} init ===> `, JSON.stringify({ ...req.body, password: null }));

		const { errors, value } = await registerValidation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		
		const {status, statusCode, data, message} = await login(value)


		return res.status(statusCode).send({
			status,
			data,
			message,
		});
	} catch (error: any) {
		console.log(`${logPrefix} Error ===>`, error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to register, please try again in a few minutes",
			errors: [],
		});

	}
}