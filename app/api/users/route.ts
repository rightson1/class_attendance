import conn from "@/database/conn";
import User from "@/database/User";
import { IuserValues } from "@/lib/data_types";
import { auth_admin } from "@/lib/firebase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body: IuserValues = await req.json();
  try {
    await conn();
    const newUser = await User.create(body);
    return NextResponse.json(newUser);
  } catch (e: any) {
    try {
      (await auth_admin()).deleteUser(body.uid);
    } catch (deleteError: any) {
      console.error(deleteError.message);
      return new Response(JSON.stringify({ message: deleteError.message }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ message: e.message }), {
      //what the best status code to use here?
      status: 400,
    });
  }
};

//get admin by uid
export const GET = async (req: NextRequest) => {
  const uid = req.nextUrl.searchParams.get("uid");
  try {
    await conn();
    const user = await User.findOne({ uid });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    return NextResponse.json(user);
  } catch (e: any) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 400,
    });
  }
};
