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
  dob: {
    type: String,
  },
  degree: {
    type: String,
    default: "Physiotherapy"
  },
  specialization: {
    type: String,
  },
  experience: {
    type: String,
  },
  status: {
    type: Boolean,
  }
});

const DoctorModel = mongoose.models.doctors || mongoose.model("doctors", DoctorSchema);

export default DoctorModel;
