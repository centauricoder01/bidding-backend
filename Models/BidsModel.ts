import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};

const BidsSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BidsModel = mongoose.model("Bids", BidsSchema);

export { BidsModel };
