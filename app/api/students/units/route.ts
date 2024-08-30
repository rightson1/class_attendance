import { errorResponse } from "@/app/lib/functions";
import conn from "@/database/conn";
import Unit from "@/database/Unit";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  const student_id = req.nextUrl.searchParams.get("student_id");
  try {
    await conn();
    const units = await Unit.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "lecturer",
          foreignField: "_id",
          as: "lecturer",
        },
      },
      {
        $unwind: "$lecturer",
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
