"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
dotenv_1.default.config();
const express = require("express");
const app = express();
const cors = require("cors");
(0, dbConnect_1.default)(process.env.MONGODB_URI);
app.use(cors());
module.exports = app;
