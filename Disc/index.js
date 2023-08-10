"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const AuthUser_1 = require("./Controllers/Auth/AuthUser");
const Bids_1 = require("./Controllers/Bids/Bids");
// ENDPOINT CONTROLLER ARE IMPORT HERE
// MIDDLEWARE START FROM HERE
const app = (0, express_1.default)();
require("dotenv").config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// PORT START FROM HERE
app.get("/", (req, res) => {
    res.send("Welcome Back sir Ji");
});
app.post("/signup", AuthUser_1.SignupUser);
app.post("/login", AuthUser_1.LoginUser);
app.post("/addproduct", Bids_1.addProduct);
app.get("/getbids", Bids_1.GetAllBid);
app.post("/yourproduct", Bids_1.UserProductBid);
app.post("/addbid", Bids_1.CreateBid);
// DATABASE CONNECTION START FROM HERE
const mongoURL = process.env.MONGO_URL || "Default_URl";
mongoose_1.default
    .connect(mongoURL, {})
    .then(() => {
    console.log("DB Connetion Successfull");
})
    .catch((err) => {
    console.log(err);
});
app.listen(8080, () => console.log(`Server started on ${process.env.PORT}`));
