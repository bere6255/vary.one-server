"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../controllers/auth"));
const auth = (0, express_1.Router)();
auth.post('/login', auth_1.default.login);
auth.post('/register', auth_1.default.register);
exports.default = auth;
