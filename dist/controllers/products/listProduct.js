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
const list_1 = __importDefault(require("../../service/products/list"));
const logPrefix = "PRODUCTS:LIST:CONTROLLER";
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`${logPrefix} init ===> `);
        const { status, statusCode, data, message } = yield (0, list_1.default)();
        return res.status(statusCode).send({
            status,
            data,
            message,
        });
    }
    catch (error) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return res.status(400).send({
            status: false,
            data: {},
            message: "Failed to fetch products, please try again in a few minutes",
            errors: [],
        });
    }
});
