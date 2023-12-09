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
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
exports.default = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const registerSchema = joi.object({
        order_id: joi.string().required().messages({
            "string.base": "Order id should be a type of 'text'",
            "string.empty": "Order id cannot be empty",
            "any.required": "Order id is required",
        }),
        qty: joi.string().required().messages({
            "string.base": "Quantity should be a type of 'text'",
            "string.empty": "Quantity cannot be empty",
            "any.required": "Quantity is required",
        })
    });
    let { error, value } = registerSchema.validate(input, { abortEarly: false });
    let newError;
    if (error) {
        newError = error.message.split(".");
    }
    return { errors: newError || null, value };
});
