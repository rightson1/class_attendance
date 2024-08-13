import { model, Schema, models } from "mongoose";
const Student = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    units: [
      {
        type: Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
  },
  { timestamps: true }
);

export default models.Student || model("Student", Student);
