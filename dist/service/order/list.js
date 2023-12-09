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
const Orders_1 = __importDefault(require("../../entity/models/Orders"));
const logPrefix = "[ORDER:LIST:SERVICE]";
exports.default = ({ user }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // feach orders with product details
        const orders = yield Orders_1.default.query().where({ user_id: user.id })
            .whereNull("deleted_at");
        return { status: true, statusCode: 200, data: orders, message: "Order fetch successful" };
    }
    catch (error) {
        console.log(`${logPrefix} error ===>`, error.message, error.stack);
        return { status: false, statusCode: 401, data: {}, message: "Order fetch failed, please try again shortly " };
    }
});
