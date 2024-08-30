import { eRes, errorResponse } from "@/app/lib/functions";
import Class from "@/database/Class";
import conn from "@/database/conn";
import { IClassStudentUpdate } from "@/lib/data_types";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
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

export const PUT = async (req: NextRequest) => {
  try {
    await conn();
    const body = await req.json();
    const { updateType, class_id, student_id }: IClassStudentUpdate = body;
    let update: any = {};
    if (updateType === "add") {
      update = {
        $addToSet: {
          students: student_id,
        },
      };
    }
    if (updateType === "remove") {
      update = {
        $pull: {
          students: student_id,
        },
      };
    }
    const class_updated = await Class.findOneAndUpdate(
      {
        _id: class_id,
      },
      update,
      {
        new: true,
      }
    );
    console.log(class_updated);
    return NextResponse.json(class_updated);
  } catch (e: any) {
    return eRes(e.message, 400);
  }
};
