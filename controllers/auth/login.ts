import { Request, Response } from "express"
import loginValidation from "./validations/login"
import login from "../../service/auth/login";
const logPrefix = "AUTH:LOGIN:CONTROLLER";
export default async (req: Request, res: Response) => {
	try {
		console.log(`${logPrefix} init ===> `, JSON.stringify({ ...req.body, password: null }));

		const { errors, value } = await loginValidation(req.body);

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
		console.log("Login Error ======>", error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to login, please try again in a few minutes",
			errors: [],
		});

	}
}