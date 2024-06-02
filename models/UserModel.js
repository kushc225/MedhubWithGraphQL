import mongoose from "mongoose";
const signupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  registertype: {
    type: String,
    required: true,
  },
});
const UserModel = mongoose.models.user || mongoose.model("user", signupSchema);
export default UserModel;
