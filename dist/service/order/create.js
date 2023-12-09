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
const Products_1 = __importDefault(require("../../entity/models/Products"));
const logPrefix = "[ORDER:CREATE:SERVICE]";
exports.default = ({ user, product_id, qty }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if product exist
        const getProdut = yield Products_1.default.query().findOne({ id: product_id });
        if (!getProdut) {
            console.log(`${logPrefix} product not found id: ${product_id} user: ${user.id}`);
            return { status: false, statusCode: 401, data: {}, message: "product not found" };
        }
        // other business logics
        // create orders with product details
        const orders = yield Orders_1.default.query().insertAndFetch({
            user_id: user.id,
            product_id,
            qty,
            created_at: new Date(),
            updated_at: new Date(),
        })
            .whereNull("deleted_at");
        return { status: true, statusCode: 200, data: orders, message: "Order placed successful, please proceed to payment" };
    }
    catch (error) {
        console.log(`${logPrefix} error ===>`, error.message, error.stack);
        return { status: false, statusCode: 401, data: {}, message: "Order failed, please try again shortly " };
    }
});
