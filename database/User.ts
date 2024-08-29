import { Schema, model, models } from "mongoose";

const User = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a User Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a User Email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    uid: {
      type: String,
      required: [true, "Please provide a User UID"],
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "lecture", "student"],
      default: "student",
    },
    regNo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", User);
