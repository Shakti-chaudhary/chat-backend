import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  text: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
