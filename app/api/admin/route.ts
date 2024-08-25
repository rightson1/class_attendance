import Admin from "@/database/Admin";
import conn from "@/database/conn";
import { IAdminValues } from "@/lib/data_types";
import { auth_admin } from "@/lib/firebase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextResponse) => {
  const body: IAdminValues = await req.json();
  try {
    await conn();
    const newAdmin = await Admin.create(body);
    return NextResponse.json(newAdmin);
  } catch (e: any) {
    // try {
    //   (await auth_admin()).deleteUser(body.uid);r
    // } catch (deleteError: any) {
    //   console.error(deleteError.message);
    //   return new Response(JSON.stringify({ message: deleteError.message }), {
    //     status: 400,
    //   });
    // }
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
    const admin = await Admin.findOne({ uid });
    if (!admin) {
      return new Response(JSON.stringify({ message: "Admin not found" }), {
        status: 404,
      });
    }
    return NextResponse.json(admin);
  } catch (e: any) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 400,
    });
  }
};
