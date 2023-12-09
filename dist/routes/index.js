"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const orders_1 = __importDefault(require("./orders"));
const products_1 = __importDefault(require("./products"));
const routes = (0, express_1.Router)();
routes.use('/api/auth/', auth_1.default);
routes.use('/api/orders/', orders_1.default);
routes.use('/api/products/', products_1.default);
routes.get('/', (req, res) => {
    res.status(200).send({ status: true, data: {}, message: "wellcome to vary.one 🚀🚀🛰🛰" });
});
exports.default = routes;
