import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface isAvailablity {
  day: string;
  timeSlots: {
    startTime: string;
    endTime: string;
  }[];
}

// rating interface

export interface isRating {
  averageRating: number;
  totalReviews: number;
}

export interface isAstrologer extends Document {
  name: {
    firstName: string;
    lastName: string;
  };
  gender: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  specialization: string[];
  experience: number;
  languages: string[];
  profilePicture: string;
  bio: string;
  availability: isAvailablity[];
  ratings: isRating;
  isOnline: boolean;
  isProfileCompleted: boolean;
  isAccountApprovedByAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId; //
}

// Define Mongoose schema
const AstrologerSchema: Schema = new Schema<isAstrologer>(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    gender: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },

    city: { type: String, required: false },
    country: { type: String, required: false },
    specialization: [{ type: String, required: false }],
    experience: { type: Number, required: false },
    languages: [{ type: String, required: false }],
    profilePicture: { type: String, required: false },
    bio: { type: String, required: false },
    availability: [
      {
        day: { type: String, required: false },
        timeSlots: [
          {
            startTime: { type: String, required: false },
            endTime: { type: String, required: false },
          },
        ],
      },
    ],
    ratings: {
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },
    isOnline: { type: Boolean, default: false },
    isProfileCompleted: { type: Boolean, default: false },
    isAccountApprovedByAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// create mongoose model

const Astrologer: Model<isAstrologer> = mongoose.model<isAstrologer>(
  "Astrologer",
  AstrologerSchema
);

export default Astrologer;
