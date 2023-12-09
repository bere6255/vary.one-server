"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = __importDefault(require("../../controllers/order"));
const auth = (0, express_1.Router)();
auth.get('/list', order_1.default.listOrders);
auth.post('/create', order_1.default.createOrders);
exports.default = auth;
