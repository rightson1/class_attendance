import { eRes } from "@/app/lib/functions";
import conn from "@/database/conn";
import Unit from "@/database/Unit";
import { IUnitStudentUpdate } from "@/lib/data_types";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  const unit_id = req.nextUrl.searchParams.get("id");
  if (!unit_id) {
    return eRes("Please Provide ID", 400);
  }
  const units = await Unit.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(unit_id),
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
      $project: {
        _id: 0,
        students: 1,
      },
    },
  ]);

  const students = units.length > 0 ? units[0].students : [];
  return NextResponse.json(students);
};

export const PUT = async (req: NextRequest) => {
  try {
    await conn();
    const body = await req.json();
    const { updateType, unit_id, student_id }: IUnitStudentUpdate = body;
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
    const unit = await Unit.findOneAndUpdate(
      {
        _id: unit_id,
      },
      update,
      {
        new: true,
      }
    );
    return NextResponse.json(unit);
  } catch (e: any) {
    return eRes(e.message, 400);
  }
};
