"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../entity/models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const objection_1 = require("objection");
const generateJWT_1 = __importDefault(require("../../utils/generateJWT"));
const logPrefix = "[AUTH:REGISTER:SERVICE]";
const saltRounds = process.env.SALT_ROUNDS || "10";
exports.default = ({ fullName, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = yield User_1.default.query()
            .findOne({ email });
        if (userEmail) {
            return {
                status: false,
                statusCode: 406,
                data: {},
                message: "You already have an account with this email, please login",
            };
        }
        let passwordHash = null;
        if (password) {
            passwordHash = yield bcryptjs_1.default.hash(password, parseInt(saltRounds));
        }
        let newUser = null;
        try {
            yield (0, objection_1.transaction)(User_1.default, (User) => __awaiter(void 0, void 0, void 0, function* () {
                const newUserData = {
                    fullName,
                    email,
                    password: passwordHash,
                    created_at: new Date(),
                    updated_at: new Date(),
                };
                newUser = yield User.query().insertAndFetch(newUserData);
            }));
        }
        catch (error) {
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
        const token = (0, generateJWT_1.default)(newUser.id);
        const theUser = yield User_1.default.query()
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
        return { status: false, statusCode: 400, data: {}, message: "Registration unsuccessful" };
    }
    catch (error) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return { status: false, statusCode: 401, data: {}, message: "Registration failed " };
    }
});
