"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reqString = {
    type: String,
    required: true,
};
const reqNumber = {
    type: Number,
    required: true,
};
const BidsSchema = new mongoose_1.default.Schema({
    userId: reqString,
    title: reqString,
    desc: reqString,
    image: reqString,
    price: reqNumber,
    bids: [
        {
            name: reqString,
            amount: reqNumber,
            userId: reqString,
        },
    ],
    timeleft: reqNumber,
}, {
    timestamps: true,
    versionKey: false,
});
const BidsModel = mongoose_1.default.model("Bids", BidsSchema);
exports.BidsModel = BidsModel;
