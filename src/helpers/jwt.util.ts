import jwt from "jsonwebtoken";
import { Response } from "express";
import { Types } from "mongoose";

export const generateToken = (userId: Types.ObjectId, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRETKEY as string, {
    expiresIn: "7D",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};
