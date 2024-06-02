import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import decodeToken from "./decodeToken";
export default function decodeCookie(req) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
    console.log(decodedToken.id);
    return decodeToken;
  } catch (error) {
    throw new Error(error.message);
  }
}
