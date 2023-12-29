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
exports.logoutUser = exports.validateToken = exports.loginUser = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const token_1 = require("../lib/token");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array(),
        });
    }
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid Credentials",
            });
            return;
        }
        console.log("email, password", email, password);
        let isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
        console.log("user", isPasswordMatch);
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: "Invalid Credentials",
            });
            return;
        }
        const token = (0, token_1.generateToken)(user._id);
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).json({ userId: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
exports.loginUser = loginUser;
const validateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({ user: req.userId });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});
exports.validateToken = validateToken;
const logoutUser = (req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    return res.send();
};
exports.logoutUser = logoutUser;
