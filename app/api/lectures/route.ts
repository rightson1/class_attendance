import User from "@/database/User";
import { IuserValues } from "@/lib/data_types";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
