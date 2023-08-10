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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBid = exports.UserProductBid = exports.GetAllBid = exports.addProduct = void 0;
const BidsModel_1 = require("../../Models/BidsModel");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new BidsModel_1.BidsModel(req.body);
        yield newUser.save();
        res.status(200).send({ message: "Bid saved" });
    }
    catch (error) {
        res.status(500).send({ message: "Server Error", error });
    }
});
exports.addProduct = addProduct;
const GetAllBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllBids = yield BidsModel_1.BidsModel.find({});
        res.status(200).send({ message: "All Bids", AllBids });
    }
    catch (error) {
        res.status(500).send({ message: "Server Error", error });
    }
});
exports.GetAllBid = GetAllBid;
const UserProductBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const yourBids = yield BidsModel_1.BidsModel.find({ userId });
        res.status(200).send({ message: "Your Bids", yourBids });
    }
    catch (error) {
        res.status(500).send({ message: "server Error", error });
    }
});
exports.UserProductBid = UserProductBid;
const CreateBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, amount, userId, productId } = req.body;
        const getProduct = yield BidsModel_1.BidsModel.updateOne({ _id: productId }, { $push: { bids: { name, amount, userId } } });
        res.status(200).send({ message: "Bid Added", getProduct });
    }
    catch (error) {
        res.status(500).send({ message: "Server Error", error });
    }
});
exports.CreateBid = CreateBid;
