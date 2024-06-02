import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/UserModel";
import NeedModel from "@/models/NeedModel";
import MedicineModel from "@/models/MedicineModel";
import { dbConnect } from "@/features/dbConnect";
export async function GET(req) {
  try {
    dbConnect();
    const data = req.cookies.get("token")?.value || "";
    if (!data) {
      return NextResponse.json(
        { success: false, msg: "Please Login first" },
        { status: 401 }
      );
    }
    const decodeddata = await jwt.verify(data, process.env.JWT_SEC_KEY);
    const id = decodeddata.id;
    const userProfile = await UserModel.findById(id);
    const donateProfile = await MedicineModel.find({ owner: id });
    const needProfile = await NeedModel.find({ owner: id });

    return NextResponse.json(
      { success: true, userProfile, donateProfile, needProfile },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: error.message },
      { status: 500 }
    );
  }
}
