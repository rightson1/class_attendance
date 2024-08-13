import conn from "@/database/conn";
import User from "@/database/User";
import { INewUser, IuserValues } from "@/lib/data_types";
import { auth_admin } from "@/lib/firebase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await conn();
    const body: INewUser = await req.json();
    const auth = await auth_admin();
    const user = await auth.createUser({
      email: body.email,
      password: body.password,
    });
    const userValues: IuserValues = {
      name: body.name,
      email: body.email,
      uid: user.uid,
      role: body.role,
    };
    try {
      await User.create(userValues);
    } catch (err) {
      await auth.deleteUser(user.uid);
      throw new Error(
        "Failed to create user in the database, user deleted from Firebase Auth"
      );
    }

    return NextResponse.json({ message: "User created" });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};

//delete user

export const DELETE = async (req: NextRequest) => {
  try {
    await conn();
    const uid = req.nextUrl.searchParams.get("uid");
    const auth = await auth_admin();
    await auth.deleteUser(uid as string);
    await User.deleteOne({ uid: uid });
    return NextResponse.json({ message: "User deleted" });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};

//get lecture or student based on role

export const GET = async (req: NextRequest) => {
  try {
    await conn();
    const role = req.nextUrl.searchParams.get("role");
    const users = await User.find({ role: role });
    return NextResponse.json(users);
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
