import { NextResponse } from "next/server";
import { dbConnect } from "@/features/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcrypt";
export async function POST(req, res) {
  try {
    const { name, phone_no, address, email, password } = await req.json();
    dbConnect();
    const withEmail = await UserModel.findOne({ email });
    const withPhone = await UserModel.findOne({ phone_no });

    if (!withEmail && !withPhone) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const user = await new UserModel({
        password: hashedPass,
        name,
        phone_no,
        address,
        email,
      });
      const newuser = await user.save();
      return NextResponse.json(
        { success: true, msg: "Account Created", newuser },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        msg: "Phone number or email is already in use",
      },
      { status: 409 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: true, msg: error.message },
      { status: 200 }
    );
  }
}
