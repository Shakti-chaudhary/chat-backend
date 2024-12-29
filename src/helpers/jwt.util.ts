import jwt from "jsonwebtoken";
import { Response } from "express";
import { Types } from "mongoose";

export const generateToken = (userId: Types.ObjectId, res: Response) => {
  console.log(" Type of Secret key ==> ", typeof process.env.JWT_SECRETKEY);
  console.log("Value of Secret key ==> ", process.env.JWT_SECRETKEY);

  const token = jwt.sign({ userId }, process.env.JWT_SECRETKEY, {
    expiresIn: "7D",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};
