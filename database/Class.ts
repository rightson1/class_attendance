import { Schema, Types, models, model } from "mongoose";

const ClassSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Name for this class"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    lecturer: {
      type: Types.ObjectId,
      required: true,
    },
    students: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
    unit: {
      type: Types.ObjectId,
      required: true,
      trim: true,
    },
    class_date: {
      type: Date,
      required: [true, "Please provide a Date for this class"],
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "ended", "upcoming", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Class || model("Class", ClassSchema);
