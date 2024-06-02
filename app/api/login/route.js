import { NextResponse } from "next/server";
import UserModel from "@/models/UserModel.js";
import { dbConnect } from "@/features/dbConnect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, msg: "Invalid Credentials" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, msg: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const payload = {
      id: user._id,
      email: user.email,
      phone_no: user.phone_no,
    };
    const token = await jwt.sign(payload, process.env.JWT_SEC_KEY);

    const res = NextResponse.json({
      success: true,
      msg: "Login Successful",
      token,
    });
    res.cookies.set("token", token, { httpOnly: true, path: "/" });
    return res;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
