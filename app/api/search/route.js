import { NextResponse } from "next/server";
import { dbConnect } from "@/features/dbConnect";
import MedicineModel from "@/models/MedicineModel";
export async function POST(req) {
  try {
    dbConnect();
    const { med_name } = await req.json();

    const res = await MedicineModel.find({
      name: med_name,
      active: true,
    });
    const list = res.map((ele) => {
      return ele.owner;
    });

    return NextResponse.json(
      { success: true, msg: "we have help", list },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: fales, msg: error.message },
      { status: 500 }
    );
  }
}
