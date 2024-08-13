import { model, models, Schema } from "mongoose";

const Unit = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the unit"],
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    students: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    lecturer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Unit || model("Unit", Unit);
