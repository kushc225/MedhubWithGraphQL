import { dbConnect } from "@/features/dbConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "@/models/UserModel";
import MedicineModel from "@/models/MedicineModel";

export const getUserList = (_, X_, context) => {
  try {
    return [
      {
        _id: "lksdjflskjdf",
        name: "Kush Kumar Choudahry",
        phone_no: "9876543211",
        address: "Tapkara Ranchi Jharkhand",
        email: "kushc225@gmail.com",
        password: "0987654321   ",
      },
    ];
  } catch (error) {
    return new Error("INTERNAL SERVER ERROR");
  }
};

export const login = async (_, { input: { email, password } }, context) => {
  try {
    await dbConnect();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return { success: false, msg: "Invalid Credentials" };
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { success: false, msg: "Invalid Credentials" };
    }

    const payload = {
      id: user._id,
      email: user.email,
      phone_no: user.phone_no,
    };
    const token = await jwt.sign(payload, process.env.JWT_SEC_KEY);

    return {
      success: true,
      msg: "Login Successful",
      token,
      headers: {
        setCookie: `token=${token}; HttpOnly; Path=/`,
      },
    };
  } catch (error) {
    console.log(error);
    return new Error("INTERNAL SERVER ERROR");
  }
};

export const getUserById = async (parent, { input }) => {
  try {
    const { id } = input;
    const flag = id.includes("@gmail.com") || id.includes("@github.com");
    let user;
    if (flag) {
      user = await UserModel.find({ email: id });
    } else {
      user = await UserModel.findById(id);
    }
    if (!user)
      return {
        success: false,
        msg: "No user found in the database",
      };
    return {
      success: true,
      msg: "found one",
      user: flag ? user[0] : user,
    };
  } catch (error) {
    console.log(error);
    return new Error("Internal Server Error");
  }
};

export const getUserByEmail = async (parent, { id }) => {
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user)
      return {
        success: false,
        msg: "No user found in the database",
      };

    return {
      success: true,
      msg: "found one",
      user,
    };
  } catch (error) {
    console.log(error);
    return new Error("Internal Server Error");
  }
};

export const searchMedicine = async (_, input) => {
  try {
    const {
      input: { medName },
    } = input;
    let result = await MedicineModel.find({ name: medName, active: true }).sort(
      { expire: -1 }
    );
    console.log({ result });
    result = result.map(async (med) => ({
      user: await UserModel.findById(med.owner),
      med,
    }));
    return result;
  } catch (error) {
    console.error("Error searching for medicine:", error);
    return {
      success: false,
      msg: "Internal Server Error",
      list: [],
    };
  }
};

export const listHanlder = async ({ list }) => {
  try {
    const result = [];
    for (const ele of list) {
      const { owner } = ele;
      const data = await UserModel.findById(owner);
      if (!data) result.push(data);
    }
    return result;
  } catch (error) {
    console.log(error);
    return new Error("Internal Server Error");
  }
};

export const myHistory = async (_, input) => {
  try {
    dbConnect();
    const {
      input: {
        email,
        donateOrNeed,
        page = 1,
        pageSize = 10,
        sortWithNewestFirst,
      },
    } = input;
    const { _id } = await UserModel.findOne({ email });
    let query = { owner: _id };
    let sortOption = { createAt: sortWithNewestFirst ? 1 : 0 };
    const len = await MedicineModel.countDocuments(query);
    if (donateOrNeed === "donate") {
      const MedType = await MedicineModel.find(query)
        .sort(sortOption)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      return { MedType, len: len };
    }
  } catch (error) {
    console.log(error.message);
    return new Error("Internal Server Error");
  }
};
