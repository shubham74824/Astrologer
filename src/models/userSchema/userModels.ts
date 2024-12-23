import mongoose, { Schema, Document, Model, Types } from "mongoose";


export interface isUser extends Document {
  name: {
    firstName: string;
    lastName: string;
  };

  phone: string;
  profileImage:string;
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId; //
}

const UserSchema: Schema = new Schema<isUser>(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phone: { type: String, required: true, unique: true },
    profileImage: { 
      type: String, 
      default: null // Default to null if no image is provided
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create mongoose model
const User:Model<isUser> = mongoose.model<isUser>("User", UserSchema);

export default User;
