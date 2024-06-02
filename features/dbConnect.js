import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db Connected");
  } catch (err) {
    console.log(err.message);
  }
};
