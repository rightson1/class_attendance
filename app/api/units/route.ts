import conn from "@/database/conn";
import Unit from "@/database/Unit";
import { IUnit, IUnitValues } from "@/lib/data_types";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const POST = async (req: NextResponse) => {
  try {
    await conn();
    const body: IUnitValues = await req.json();
    const new_unit = await Unit.create(body);
    return NextResponse.json(new_unit);
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await conn();
    if (id) {
      let unit = await Unit.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id),
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
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "unit",
            as: "students",
          },
        },
      ]);
      unit = unit[0];
      return NextResponse.json(unit);
    } else {
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
          $unwind: {
            path: "$lecturer",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      return NextResponse.json(units);
    }
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};

//update  unit

export const PUT = async (req: NextRequest) => {
  try {
    await conn();
    const body: IUnit = await req.json();
    const { _id, ...rest } = body;
    const updated_unit = await Unit.findByIdAndUpdate(_id, rest, {
      new: true,
    });
    return NextResponse.json(updated_unit);
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
