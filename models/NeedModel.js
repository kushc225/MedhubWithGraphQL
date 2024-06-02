import mongoose from "mongoose";

const needSchema = mongoose.Schema({
  owner: {
    type: String,
    required: [true, "Owner name is must"],
  },
  list: {
    type: [String],
    required: [true, "At least one data need to be added"],
  },
});
const NeedModel = mongoose.models.need || mongoose.model("need", needSchema);
export default NeedModel;
