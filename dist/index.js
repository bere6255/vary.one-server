"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const knexfile_1 = __importDefault(require("./knexfile"));
const routes_1 = __importDefault(require("./routes/"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 8081;
// Initialize knex.
const knex = (0, knex_1.default)(knexfile_1.default); // added prodcution incase of mispelling, wont mess up production DB
// Bind all Models to the knex instance. You only a
// need to do this once before you use any of
// your model classes.
objection_1.Model.knex(knex);
app_1.default.use(routes_1.default);
app_1.default.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
