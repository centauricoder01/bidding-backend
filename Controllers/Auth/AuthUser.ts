import { UserModel } from "../../Models/SignupModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_KEY: string = process.env.MONGO_URL || "Default_URl";

const SignupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const findOneEmail = await UserModel.findOne({ email });

    if (findOneEmail) {
      return res.send({
        message: "User Already Exist please enter new Email...",
      });
    }

    // From here Main Process will start
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        console.log("Hashed", hash);
        const newUser = new UserModel({
          name,
          email,
          password: hash,
        });

        try {
          let ReturnedUser = await newUser.save();
          let token = jwt.sign(
            {
              username: ReturnedUser.name,
              id: ReturnedUser._id,
            },
            JWT_KEY
          );
          res.send({
            token: token,
            message: "Signup Successfull",
          });
        } catch (error) {
          res.send({ message: "server error", error });
        }
      });
    });
  } catch (error) {
    res.status(400).send({ error: "There is some Error" + error });
  }
};

// LOGIN FORM START FROM HERE

const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let findUser = await UserModel.findOne({ email });
    if (findUser) {
   bcrypt.compare(password, findUser.password, function (err, result) {
        if (!result) {
          return res.send({ message: "Wrong Password" });
        } else {
          if (findUser === null) {
            return res.send("Find user is null");
          }
          let token = jwt.sign(
            {
              username: findUser.name,
              id: findUser._id,
            },
            JWT_KEY
          );
          console.log(token);
          res.send({
            user: findUser,
            token: token,
            message: "User Login Successful",
          });
        }
      });
    } else {
      res.send({ message: "User doesn't Exist" });
    }
  } catch (error) {
    res.send({ message: error });
  }
};
export { SignupUser, LoginUser };
