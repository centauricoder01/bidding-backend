import { BidsModel } from "../../Models/BidsModel";
import { Request, Response } from "express";

const addProduct = async (req: Request, res: Response) => {
  try {
    const newUser = new BidsModel(req.body);
    await newUser.save();
    res.status(200).send({ message: "Bid saved" });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error });
  }
};

const GetAllBid = async (req: Request, res: Response) => {
  try {
    const AllBids = await BidsModel.find({});
    res.status(200).send({ message: "All Bids", AllBids });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error });
  }
};

const UserProductBid = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const yourBids = await BidsModel.find({ userId });
    res.status(200).send({ message: "Your Bids", yourBids });
  } catch (error) {
    res.status(500).send({ message: "server Error", error });
  }
};

const CreateBid = async (req: Request, res: Response) => {
  try {
    const { name, amount, userId, productId } = req.body;
    const getProduct = await BidsModel.updateOne(
      { _id: productId },
      { $push: { bids: { name, amount, userId } } }
    );

    res.status(200).send({ message: "Bid Added", getProduct });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error });
  }
};

export { addProduct, GetAllBid, UserProductBid, CreateBid };
