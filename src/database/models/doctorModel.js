import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  degree: {
    type: String,
  },
  specialization: {
    type: String,
  },
  expiration: {
    type: String,
  },
  status: {
    type: Boolean,
  }
});

const DoctorModel = mongoose.models.doctors || mongoose.model("doctors", DoctorSchema);

export default DoctorModel;
