import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { id } = await req.json();
    const user = await UserModel.findById(id);
    if (user === null) {
      return NextResponse.json(
        { success: false, msg: "user not found" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: true, msg: "one use found", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: error.message },
      { status: 500 }
    );
  }
}
