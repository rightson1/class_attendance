import { errorResponse } from "@/app/lib/functions";
import conn from "@/database/conn";
import Unit from "@/database/Unit";
import Class from "@/database/Class";
import User from "@/database/User";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { all } from "axios";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  try {
    const unit_id = req.nextUrl.searchParams.get("unit_id");
    const student_id = req.nextUrl.searchParams.get("student_id");

    if (!unit_id || !student_id) {
      return errorResponse({
        message: "Please Pass Unit Id and Student Id",
        status: 500,
      });
    }

    const classes = await Class.aggregate([
      {
        $match: {
          unit: new Types.ObjectId(unit_id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "students",
          foreignField: "_id",
          as: "students",
        },
      },
      {
        $addFields: {
          allFields: {
            $mergeObjects: [
              "$$ROOT",
              {
                students: {
                  $filter: {
                    input: "$students",
                    as: "student",
                    cond: {
                      $eq: ["$$student._id", new Types.ObjectId(student_id)],
                    },
                  },
                },
              },
            ],
          },
        },
      },
      {
        $replaceRoot: { newRoot: "$allFields" },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return NextResponse.json(classes);
  } catch (error: any) {
    return errorResponse({
      message: error.message,
      status: 500,
    });
  }
};
