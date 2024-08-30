import Class from "@/database/Class";
import Unit from "@/database/Unit";
import User from "@/database/User";
import { NextRequest, NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";
import conn from "@/database/conn";
import { errorResponse } from "@/app/lib/functions";
import { Types } from "mongoose";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  try {
    await conn();
    const student_id = req.nextUrl.searchParams.get("student_id");
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    if (!student_id) {
      return errorResponse({
        message: "Student ID is required",
        status: 400,
      });
    }

    // Fetch the student's information
    const student = await User.findById(student_id);
    if (!student) {
      return errorResponse({
        message: "Student not found",
        status: 404,
      });
    }

    // Number of classes the student has today
    const studentClassesToday = await Class.countDocuments({
      students: student_id,
      class_date: { $gte: startOfToday, $lte: endOfToday },
    });

    // Number of ongoing classes for the student
    const ongoingClasses = await Class.countDocuments({
      status: "active",
    });

    // Number of completed classes for today for the student
    const completedClassesToday = await Class.countDocuments({
      students: student_id,
      class_date: { $gte: startOfToday, $lte: endOfToday },
    });

    // Number of units the student is enrolled in
    const studentUnitsCount = await Unit.countDocuments({
      students: student_id,
    });

    // Number of upcoming classes for today for the student
    const upcomingClassesToday = await Class.countDocuments({
      students: student_id,
      class_date: { $gte: startOfToday, $lte: endOfToday },
    });

    // Number of canceled classes for the student
    const canceledClasses = await Class.countDocuments({
      students: student_id,
      status: "cancelled",
    });

    // Today's classes for the student
    const todaysClasses = await Unit.aggregate([
      {
        $match: {
          // Find units where the student is in the students array
          students: new Types.ObjectId(student_id),
        },
      },
      {
        $lookup: {
          from: "classes",
          let: { unitId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$unit", "$$unitId"] },
                    { $gte: ["$class_date", startOfToday] },
                    { $lte: ["$class_date", endOfToday] },
                  ],
                },
              },
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
            {
              $project: {
                name: 1,
                description: 1,
                class_date: 1,
                start_time: 1,
                end_time: 1,
                students: 1,
                status: 1,
                unit: 1,
                lecturer: 1,
              },
            },
          ],
          as: "classes",
        },
      },
      {
        $unwind: "$classes",
      },
      {
        $replaceRoot: {
          newRoot: "$classes",
        },
      },
    ]);

    return NextResponse.json({
      studentClassesToday,
      ongoingClasses,
      completedClassesToday,
      studentUnitsCount,
      upcomingClassesToday,
      canceledClasses,
      todaysClasses,
    });
  } catch (error: any) {
    return errorResponse({
      message: error.message,
      status: 500,
    });
  }
};
