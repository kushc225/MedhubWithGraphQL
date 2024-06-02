import UserModel from "@/models/UserModel";
import { dbConnect } from "@/features/dbConnect";
import bcrypt from "bcrypt";
import MedicineModel from "@/models/MedicineModel";
import { getUserById } from "@/query/user";

export const createUser = async (
  _,
  { input: { token, name, phone_no, address, email, password } },
  context
) => {
  try {
    dbConnect();
    const { req } = context;
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
      return newuser;
    }
    return new Error("Mail or Phone number is already in use...");
  } catch (error) {
    console.log(error);
    return new Error("Internal Server Error");
  }
};

export const donate = async (
  _,
  { input: { email, name, quantity, mfd, expire } }
) => {
  try {
    dbConnect();
    const { _id } = await UserModel.findOne({ email });
    if (!_id) return new Error("No Data Found...");
    // console.log({ input });
    quantity = parseInt(quantity);
    const newmed = await MedicineModel.create({
      owner: _id,
      name: name.toLowerCase().trim(),
      quantity,
      mfd,
      expire,
    });
    return { success: true, msg: "Medicine added Successfully", newmed };
  } catch (error) {
    console.log(error);
    return new Error("Internal Server Error", +error.message);
  }
};
export const changeQuantityForMedicine = async (_, input) => {
  try {
    dbConnect();
    // console.log({ input });
    const {
      input: { _id, quantity },
    } = input;
    if (quantity === 0) {
      return await MedicineModel.findByIdAndUpdate(
        _id,
        {
          $set: { quantity: 0, active: false },
        },
        { new: true }
      );
    }

    return await MedicineModel.findByIdAndUpdate(
      _id,
      {
        $set: { quantity: quantity, active: true },
      },
      { new: true }
    );
  } catch (error) {
    console.error(error.message);
    throw new Error("Internal Server Error: " + error.message);
  }
};
