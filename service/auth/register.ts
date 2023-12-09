import User from "../../entity/models/User"
import bcrypt from "bcryptjs"
import { transaction } from "objection"
import generateJWT from "../../utils/generateJWT"

const logPrefix ="[AUTH:REGISTER:SERVICE]";
type register = {
    fullName: string
    email: string
    password: string
}
const saltRounds = process.env.SALT_ROUNDS || "10";

export default async ({ fullName, email, password }: register) => {
    try {

        const userEmail = await User.query()
            .findOne({ email });

        if (userEmail) {
            return {
                status: false,
                statusCode: 406,
                data: {},
                message:
                    "You already have an account with this email, please login",
            };
        }

        let passwordHash: any = null;
        if (password) {
            passwordHash = await bcrypt.hash(password, parseInt(saltRounds));
        }
        let newUser: any = null;

        try {
            await transaction(
                User,
                async (User: any) => {
                    const newUserData = {
                        fullName,
                        email,
                        password: passwordHash,
                        created_at: new Date(),
                        updated_at: new Date(),
                    };

                    newUser = await User.query().insertAndFetch(newUserData);
                }
            );
        } catch (error: any) {
            console.log(`${logPrefix} account creation error ===>`, error.message, error.stack);
            return {
                status: false,
                statusCode: 406,
                data: {},
                message: "Registration error, kindly try again in a few minutes",
            };
        }
        if (!newUser) {
            return {
                status: false,
                statusCode: 401,
                data: {},
                message: "Registration error, kindly try again in a few minutes",
            };
        }



        const token = generateJWT(newUser.id);

        const theUser = await User.query()
            .findById(newUser.id)
            .withGraphFetched("wallet");
        if (theUser) {
            return {
                status: true,
                statusCode: 201,
                data: { token, user: theUser.user() },
                message: "Registration successful "
            };
        }

        return { status: false, statusCode: 400, data: {}, message: "Registration unsuccessful" }
    } catch (error: any) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return { status: false, statusCode: 401, data: {}, message: "Registration failed " }
    }
}