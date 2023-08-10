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
exports.LoginUser = exports.SignupUser = void 0;
const SignupModel_1 = require("../../Models/SignupModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_KEY = process.env.MONGO_URL || "Default_URl";
const SignupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const findOneEmail = yield SignupModel_1.UserModel.findOne({ email });
        if (findOneEmail) {
            return res.send({
                message: "User Already Exist please enter new Email...",
            });
        }
        // From here Main Process will start
        bcrypt_1.default.genSalt(10, function (err, salt) {
            bcrypt_1.default.hash(password, salt, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("Hashed", hash);
                    const newUser = new SignupModel_1.UserModel({
                        name,
                        email,
                        password: hash,
                    });
                    try {
                        let ReturnedUser = yield newUser.save();
                        let token = jsonwebtoken_1.default.sign({
                            username: ReturnedUser.name,
                            id: ReturnedUser._id,
                        }, JWT_KEY);
                        res.send({
                            token: token,
                            message: "Signup Successfull",
                        });
                    }
                    catch (error) {
                        res.send({ message: "server error", error });
                    }
                });
            });
        });
    }
    catch (error) {
        res.status(400).send({ error: "There is some Error" + error });
    }
});
exports.SignupUser = SignupUser;
// LOGIN FORM START FROM HERE
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let findUser = yield SignupModel_1.UserModel.findOne({ email });
        if (findUser) {
            bcrypt_1.default.compare(password, findUser.password, function (err, result) {
                if (!result) {
                    return res.send({ message: "Wrong Password" });
                }
                else {
                    if (findUser === null) {
                        return res.send("Find user is null");
                    }
                    let token = jsonwebtoken_1.default.sign({
                        username: findUser.name,
                        id: findUser._id,
                    }, JWT_KEY);
                    console.log(token);
                    res.send({
                        user: findUser,
                        token: token,
                        message: "User Login Successful",
                    });
                }
            });
        }
        else {
            res.send({ message: "User doesn't Exist" });
        }
    }
    catch (error) {
        res.send({ message: error });
    }
});
exports.LoginUser = LoginUser;
