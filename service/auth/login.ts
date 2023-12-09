import User from "../../entity/models/User"
import bcrypt from "bcryptjs";
import generateJWT from "../../utils/generateJWT"
type login = {
	emailPhone: string
	password: string
}
const logPrefix ="[AUTH:LOGIN:SERVICE]";

export default async ({ emailPhone, password }: login) => {
	try {

		const user = await User.query().findOne({ email: emailPhone }).orWhere({ phone: emailPhone }).whereNull("deleted_at")
			.whereNull("deleted_at")
			.withGraphFetched("wallet");

		if (!user) {
			return {
				status: false,
				statusCode: 400,
				date: {},
				message: `Wrong email and password combination`,
			};
		}

		const validated = await bcrypt.compare(password, user.password);
		
		if (validated === false) {

			return {
				status: false,
				statusCode: 400,
				data: {},
				message: `Wrong email and password combination`,
			};

		}
	

		const token = await generateJWT(user.id);
		let formatedUser = user.user();
	
		return { status: true, statusCode: 200, data: { token, user: formatedUser }, message: "Login successful" }
	} catch (error: any) {
		console.log(`${logPrefix} error ===>`, error.message, error.stack);
		return { status: false, statusCode: 401, data: {}, message: "Login failed, please try again shortly " }
	}
}