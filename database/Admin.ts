import { Schema, model, models } from "mongoose";

const Admin = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Admin Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a Admin Email"],
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
      required: [true, "Please provide a Admin UID"],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Admin || model("Admin", Admin);
