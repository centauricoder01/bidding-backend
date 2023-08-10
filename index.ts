import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { SignupUser, LoginUser } from "./Controllers/Auth/AuthUser";
import {
  addProduct,
  CreateBid,
  GetAllBid,
  UserProductBid,
} from "./Controllers/Bids/Bids";

// ENDPOINT CONTROLLER ARE IMPORT HERE

// MIDDLEWARE START FROM HERE
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

// PORT START FROM HERE

app.get("/", (req, res) => {
  res.send("Welcome Back sir Ji");
});

app.post("/signup", SignupUser);
app.post("/login", LoginUser);
app.post("/addproduct", addProduct);
app.get("/getbids", GetAllBid);
app.post("/yourproduct", UserProductBid);
app.post("/addbid", CreateBid);

// DATABASE CONNECTION START FROM HERE

const mongoURL: string = process.env.MONGO_URL || "Default_URl";

mongoose
  .connect(mongoURL, {})
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8080, () => console.log(`Server started on ${process.env.PORT}`));
