"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = authmiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function authmiddleware(req, res, next) {
    console.log("mid");
    //@ts-ignore
    const token = req.headers.authorization;
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        //@ts-ignore
        req.id = payload.id;
        next();
    }
    catch (e) {
        //@ts-ignore
        return res.status(403).json({
            message: "you are not logged in",
        });
    }
}
