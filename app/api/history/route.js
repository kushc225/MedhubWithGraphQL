import { dbConnect } from "@/features/dbConnect";
import decodeToken from "@/features/decodeToken.js";
import MedicineModel from "@/models/MedicineModel.js";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    dbConnect();
    const { token } = await req.json();
    const { id } = await decodeToken(token);
    const data = await MedicineModel.find({ owner: id, active: true });
    console.log({ data });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: error.message },
      { status: 500 }
    );
  }
}
