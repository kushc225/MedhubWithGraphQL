import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    let token = req.cookies.get("token")?.value || "";
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
      // return NextResponse.json({success:true,msg:'already logout'}, {status : 401})
    }
    const res = NextResponse.json(
      {
        success: true,
        msg: "Logout Successful",
      },
      { status: 200 }
    );
    res.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: error.message },
      { status: 500 }
    );
  }
}
