import mongoose from "mongoose";

const MedSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    mfd: {
      type: String,
      required: true,
    },
    expire: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const MedicineModel =
  mongoose.models.medicinelist || mongoose.model("medicinelist", MedSchema);
export default MedicineModel;
