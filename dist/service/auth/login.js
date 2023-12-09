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
const generateJWT_1 = __importDefault(require("../../utils/generateJWT"));
const logPrefix = "[AUTH:LOGIN:SERVICE]";
exports.default = ({ emailPhone, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.query().findOne({ email: emailPhone }).orWhere({ phone: emailPhone }).whereNull("deleted_at")
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
        const validated = yield bcryptjs_1.default.compare(password, user.password);
        if (validated === false) {
            return {
                status: false,
                statusCode: 400,
                data: {},
                message: `Wrong email and password combination`,
            };
        }
        const token = yield (0, generateJWT_1.default)(user.id);
        let formatedUser = user.user();
        return { status: true, statusCode: 200, data: { token, user: formatedUser }, message: "Login successful" };
    }
    catch (error) {
        console.log(`${logPrefix} error ===>`, error.message, error.stack);
        return { status: false, statusCode: 401, data: {}, message: "Login failed, please try again shortly " };
    }
});
