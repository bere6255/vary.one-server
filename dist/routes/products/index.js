"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("../../controllers/products"));
const auth = (0, express_1.Router)();
auth.get('/list', products_1.default.listProduct);
auth.post('/create', products_1.default.createProduct);
exports.default = auth;
