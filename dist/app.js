"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/"));
const cors_1 = __importDefault(require("cors"));
express_1.default.json({ limit: 2000, type: 'application/json' });
const app = (0, express_1.default)();
// parse application/json
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Initialize knex.
app.use(routes_1.default);
exports.default = app;
