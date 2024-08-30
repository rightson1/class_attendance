import Class from "@/database/Class";
import Unit from "@/database/Unit";
import User from "@/database/User";
import { NextRequest, NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";
import conn from "@/database/conn";
import { errorResponse } from "@/app/lib/functions";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  try {
    await conn();

    const today = new Date();
    const lecturerCount = await User.countDocuments({ role: "lecture" });

    const studentCount = await User.countDocuments({ role: "student" });
    const totalClassCount = await Class.countDocuments();

    const upcomingClassCount = await Class.countDocuments({
      class_date: { $gt: today },
    });

    const ongoingClassCount = await Class.countDocuments({
      status: "active",
    });

    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);
    const completedClassCountToday = await Class.countDocuments({
      class_date: { $gte: startOfToday, $lte: endOfToday },
      status: "ended",
    });

    const unitCount = await Unit.countDocuments();

    // List of all classes today
    const classesToday = await Class.aggregate([
      {
        $match: {
          class_date: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $lookup: {
          from: "users", // The collection name for User
          localField: "lecturer",
          foreignField: "_id",
          as: "lecturer",
        },
      },
      {
        $lookup: {
          from: "units", // The collection name for Unit
          localField: "unit",
          foreignField: "_id",
          as: "unit",
        },
      },
      {
        $unwind: "$lecturer", // If you want lecturerDetails as an object, not an array
      },
      {
        $unwind: "$unit", // If you want unitDetails as an object, not an array
      },
    ]);

    return NextResponse.json({
      lecturers: lecturerCount,
      students: studentCount,
      totalClasses: totalClassCount,
      upcomingClasses: upcomingClassCount,
      ongoingClasses: ongoingClassCount,
      completedClassesToday: completedClassCountToday,
      totalUnits: unitCount,
      classesToday,
    });
  } catch (error: any) {
    return errorResponse({
      message: error.message,
      status: 500,
    });
  }
};
