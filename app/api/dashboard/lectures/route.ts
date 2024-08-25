import Class from "@/database/Class";
import Unit from "@/database/Unit";
import User from "@/database/User";
import { NextRequest, NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";
import conn from "@/database/conn";
import { errorResponse } from "@/app/lib/functions";

export const GET = async (req: NextRequest) => {
  try {
    await conn();
    const lecture_id = req.nextUrl.searchParams.get("lecture_id");
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    if (!lecture_id) {
      return errorResponse({
        message: "Lecture ID is required",
        status: 400,
      });
    }

    // Number of lecture's classes today
    const lectureClassesToday = await Class.countDocuments({
      lecturer: lecture_id,
      class_date: { $gte: startOfToday, $lte: endOfToday },
    });

    // Number of ongoing classes for the lecturer
    const ongoingClasses = await Class.countDocuments({
      lecturer: lecture_id,
      class_date: today,
      start_time: { $lte: today.getHours() },
      end_time: { $gte: today.getHours() },
    });

    // Number of completed classes for today for the lecturer
    const completedClassesToday = await Class.countDocuments({
      lecturer: lecture_id,
      class_date: { $gte: startOfToday, $lte: endOfToday },
      end_time: { $lt: today.getHours() },
    });

    // Number of units the lecturer teaches
    const lectureUnitsCount = await Unit.countDocuments({
      lecturer: lecture_id,
    });

    // Number of students in all the units the lecturer teaches
    const studentsCount = await Unit.aggregate([
      { $match: { lecturer: lecture_id } },
      {
        $lookup: {
          from: "users",
          localField: "students",
          foreignField: "_id",
          as: "students",
        },
      },
      { $unwind: "$students" },
      { $count: "totalStudents" },
    ]);

    // Number of upcoming classes for today for the lecturer
    const upcomingClassesToday = await Class.countDocuments({
      lecturer: lecture_id,
      class_date: { $gte: startOfToday, $lte: endOfToday },
      start_time: { $gt: today.getHours() },
    });

    // Number of lecture's canceled classes
    const canceledClasses = await Class.countDocuments({
      lecturer: lecture_id,
      status: "cancelled",
    });

    // Today's classes for the lecturer
    const todaysClasses = await Class.aggregate([
      {
        $match: {
          lecturer: lecture_id,
          class_date: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $lookup: {
          from: "units",
          localField: "unit",
          foreignField: "_id",
          as: "unitDetails",
        },
      },
      { $unwind: "$unitDetails" },
    ]);

    return NextResponse.json({
      lectureClassesToday,
      ongoingClasses,
      completedClassesToday,
      lectureUnitsCount,
      studentsCount: studentsCount[0]?.totalStudents || 0,
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
