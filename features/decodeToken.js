import jwt from "jsonwebtoken";

export default async function decodeToken(token) {
  try {
    var decoded = await jwt.verify(token, process.env.JWT_SEC_KEY);
    return decoded;
  } catch (error) {
    return error.message;
  }
}
