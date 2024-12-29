import jwt from "jsonwebtoken";
import { Response } from "express";
import { Types } from "mongoose";

export const generateToken = (userId: Types.ObjectId, res: Response) => {
  const secretKey = process.env.JWT_SECRETKEY;
  console.log(" Type of Secret key ==> ", typeof secretKey);
  console.log("Value of Secret key ==> ", secretKey);

  if (!secretKey) {
    throw new Error("JWT_SECRETKEY is not defined in environment variables.");
  }

  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "7D",
  });

  // Log cookie setting attempt
  console.log("Setting cookie with token:", token);

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
    domain: process.env.RENDER_EXTERNAL_HOSTNAME || ".onrender.com",
  });

  // Log headers after setting cookie
  console.log("Headers after setting cookie:", res.getHeaders());

  console.log(
    "Is Token Generared let's check.. and userId.. ==>>  ",
    token,
    " ==>> ",
    userId
  );
  return token;
};
