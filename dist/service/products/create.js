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
const Products_1 = __importDefault(require("../../entity/models/Products"));
const logPrefix = "[PRODUCTS:CREATE:SERVICE]";
exports.default = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // other business logics
        // create orders with product details
        const product = yield Products_1.default.query().insertAndFetch(Object.assign(Object.assign({}, payload), { created_at: new Date(), updated_at: new Date() }))
            .whereNull("deleted_at");
        return { status: true, statusCode: 200, data: product, message: "Product created successfully" };
    }
    catch (error) {
        console.log(`${logPrefix} error ===>`, error.message, error.stack);
        return { status: false, statusCode: 401, data: {}, message: "Product creation failed, please try again shortly " };
    }
});
