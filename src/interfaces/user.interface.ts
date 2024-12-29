import mongoose, { Document } from "mongoose";

export interface TUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  fullName: string;
  password: string;
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}
