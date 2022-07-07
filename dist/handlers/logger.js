"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const path_1 = require("path");
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const transport = new winston_daily_rotate_file_1.default({
    filename: (0, path_1.join)(__dirname, "../../logs/%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: false,
    maxSize: "32m",
    maxFiles: "14d"
});
exports.logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    transports: [
        transport,
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }), winston_1.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`))
        })
    ]
});
