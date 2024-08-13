import { eRes, errorResponse } from "@/app/lib/functions";
import Class from "@/database/Class";
import conn from "@/database/conn";
import User from "@/database/User";
import { classSchema, IClassValues } from "@/lib/zod";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await conn();
    const _id = req.nextUrl.searchParams.get("_id");

    if (_id) {
      const classes = await Class.aggregate([
        {
          $match: { _id: new Types.ObjectId(_id) },
        },
        {
          $lookup: {
            from: "users",
            localField: "students",
            foreignField: "_id",
            as: "students",
          },
        },
      ]);

      const students = classes[0]?.students || [];
      return NextResponse.json(students);
    }
  } catch (e: any) {
    return errorResponse({
      message: e.message,
      status: 400,
    });
  }
};
