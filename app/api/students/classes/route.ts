import { errorResponse } from "@/app/lib/functions";
import conn from "@/database/conn";
import Unit from "@/database/Unit";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const student_id = req.nextUrl.searchParams.get("student_id");
  if (!student_id) {
    return errorResponse({
      message: "Please Pass Student Id",
      status: 500,
    });
  }
  try {
    await conn();
    const units = await Unit.aggregate([
      {
        $match: {
          students: new Types.ObjectId(student_id),
        },
      },
      {
        $lookup: {
          from: "classes",
          let: {
            unitId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$unit", "$$unitId"] }],
                },
              },
            },
            {
              $project: {
                name: 1,
                description: 1,
                class_date: 1,
                start_time: 1,
                end_time: 1,
                status: 1,
              },
            },
          ],
          as: "classes",
        },
      },
      {
        $unwind: "$classes", // Unwind the array of classes
      },
      {
        $replaceRoot: {
          newRoot: "$classes",
        },
      },
    ]);
    return NextResponse.json(units);
  } catch (error: any) {
    return errorResponse({
      message: error.message,
      status: 500,
    });
  }
};
