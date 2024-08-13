import { eRes } from "@/app/lib/functions";
import conn from "@/database/conn";
import Unit from "@/database/Unit";
import { IUnitWithSL } from "@/lib/data_types";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await conn();
    const unit_id = req.nextUrl.searchParams.get("unit_id");
    if (!unit_id) return eRes("unit_id is required", 400);
    const units = await Unit.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(unit_id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "lecturer",
          foreignField: "_id",
          as: "lecturer",
        },
      },
      {
        $unwind: {
          path: "$lecturer",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    const lecture = units && units[0].lecturer ? [units[0].lecturer] : [];
    return NextResponse.json(lecture);
  } catch (e: any) {
    return eRes(e.message, 500);
  }
};
