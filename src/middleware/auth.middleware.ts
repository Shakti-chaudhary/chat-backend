import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.modal";
import { TUser } from "../interfaces/user.interface";

interface AuthRequest extends Request {
  user?: TUser;
}

export const protectRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }
    console.log("Protected route call  and cookies is ", req.cookies);
    console.log(" token is ", req.cookies.jwt);

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY as string) as {
      userId: string;
    };

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error);
    res
      .status(500)
      .json({ message: "Internal server error in auth middleware ==>> " });
  }
};
