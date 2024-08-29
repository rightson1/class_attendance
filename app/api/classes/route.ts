import { eRes, errorResponse } from "@/app/lib/functions";
import Class from "@/database/Class";
import conn from "@/database/conn";
import { IFetched } from "@/lib/data_types";
import { classSchema, IClassValues } from "@/lib/zod";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await conn();
    const body: IClassValues = await req.json();
    body.class_date = new Date(body.class_date);
    const validation = classSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse({
        message: `Zod Validation ${validation.error.errors[0].message}`,
        status: 400,
      });
    }
    const new_class = await Class.create(body);
    return NextResponse.json(new_class);
  } catch (e: any) {
    return errorResponse({
      message: e.message,
      status: 400,
    });
  }
};

//get class by either lecturer or _id
export const GET = async (req: NextRequest) => {
  try {
    await conn();
    const lecturer = req.nextUrl.searchParams.get("lecturer");
    const _id = req.nextUrl.searchParams.get("_id");
    const unit = req.nextUrl.searchParams.get("unit");
    console.log({
      lecturer,
      _id,
      unit,
    });
    const unitLecQuery = lecturer
      ? {
          $match: {
            lecturer: new Types.ObjectId(lecturer!),
          },
        }
      : {
          $match: {
            unit: new Types.ObjectId(unit!),
          },
        };

    if (lecturer || unit) {
      const classes = await Class.aggregate([
        unitLecQuery,
        {
          $lookup: {
            from: "units",
            localField: "unit",
            foreignField: "_id",
            as: "unit",
          },
        },
        {
          $unwind: "$unit",
        },
      ]);
      return NextResponse.json(classes);
    }

    if (_id) {
      const classes = await Class.aggregate([
        {
          $match: { _id: new Types.ObjectId(_id) },
        },
        {
          $lookup: {
            from: "units",
            localField: "unit",
            foreignField: "_id",
            as: "unit",
          },
        },
        {
          $unwind: "$unit",
        },
      ]);
      return NextResponse.json(classes[0]);
    }
  } catch (e: any) {
    return errorResponse({
      message: e.message,
      status: 400,
    });
  }
};
//delete class
export const DELETE = async (req: NextRequest) => {
  try {
    await conn();
    const _id = req.nextUrl.searchParams.get("_id");
    const deleted_class = await Class.findByIdAndDelete(_id);
    return NextResponse.json(deleted_class);
  } catch (e: any) {
    return errorResponse({
      message: e.message,
      status: 400,
    });
  }
};

//edit class
export const PUT = async (req: NextRequest) => {
  try {
    await conn();
    const body: Partial<IClassValues> & IFetched = await req.json();
    const _id = body._id;
    const editClass = await Class.findByIdAndUpdate(
      _id,
      {
        ...body,
      },
      { new: true }
    );
    return NextResponse.json(editClass);
  } catch (e: any) {
    return errorResponse({
      message: e.message,
      status: 400,
    });
  }
};
