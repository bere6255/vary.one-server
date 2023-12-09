"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.default = (id) => {
    const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "../varyone.key"));
    const token = jsonwebtoken_1.default.sign({ id, created_at: new Date() }, privateKey, {
        algorithm: "RS256",
        expiresIn: "31d",
    });
    return token;
};
