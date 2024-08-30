import { eRes, errorResponse } from "@/app/lib/functions";
import conn from "@/database/conn";
import Unit from "@/database/Unit";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  try {
    await conn();
    const lecture_id = req.nextUrl.searchParams.get("lecture_id");
    const units = await Unit.find({
      lecturer: lecture_id,
    });
    return NextResponse.json(units);
  } catch (e: any) {
    return errorResponse({
      message: e.message,
      status: 500,
    });
  }
};

//delete lecture from unit
export const DELETE = async (req: NextRequest) => {
  try {
    await conn();
    const unit_id = req.nextUrl.searchParams.get("unit_id");
    const unit = await Unit.findOneAndUpdate(
      {
        _id: unit_id,
      },
      {
        $unset: {
          lecturer: "",
        },
      },
      { new: true }
    );
    console.log(unit);
    return NextResponse.json(unit);
  } catch (e: any) {
    return errorResponse({
      message: e.message,
      status: 500,
    });
  }
};
