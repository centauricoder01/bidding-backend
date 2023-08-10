import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};
const UserSchema = new mongoose.Schema(
  {
    name: reqString,
    email: reqString,
    password: reqString,
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
