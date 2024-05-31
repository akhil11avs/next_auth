import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const City = mongoose.models.city || mongoose.model("city", citySchema);

export default City;