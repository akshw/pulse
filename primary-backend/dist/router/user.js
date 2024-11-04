"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.get("/get", (req, res) => {
    res.send("HII");
});
//@ts-ignore
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignUpSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        });
    }
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
        },
    });
    if (userExists) {
        return res.status(403).json({
            message: "user already exists",
        });
    }
    else {
        yield db_1.prismaClient.user.create({
            data: {
                username: parsedData.data.username,
                email: parsedData.data.email,
                password: parsedData.data.password,
            },
        });
    }
    console.log("signup");
    //await sendemail()
    return res.json({
        msg: "Please verify",
    });
}));
//@ts-ignore
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignInSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "incorrect inputs",
        });
    }
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
        },
    });
    if (!userExists) {
        return res.status(411).json({
            message: "user not found",
        });
    }
    else {
        const token = jsonwebtoken_1.default.sign({
            id: userExists.id,
        }, config_1.JWT_PASSWORD);
        res.json({
            token,
        });
    }
}));
//@ts-ignore
router.get("/user", middleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            id,
        },
        select: {
            username: true,
            email: true,
        },
    });
    return res.json({
        user,
    });
}));
exports.userRouter = router;
