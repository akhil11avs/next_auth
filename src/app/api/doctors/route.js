import { connect } from "@/database/dbConfig/dbConfig";
import DoctorModel from "@/database/models/doctorModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  connect();
  try {
    const {
      name,
      mobile,
      email,
      gender,
      address,
      dob,
      specialization,
      experience,
    } = await request.json();

    const doctor = await DoctorModel.findOne({ mobile });

    if (doctor) {
      return NextResponse.json(
        { error: "Doctor already exists" },
        { status: 500 }
      );
    }

    if (
      !name ||
      !mobile ||
      !gender ||
      !address ||
      !dob ||
      !email ||
      !specialization ||
      !experience
    ) {
      return NextResponse.json(
        { error: "Please filled all the details" },
        { status: 400 }
      );
    }

    const newDoctor = new DoctorModel({
      name,
      mobile,
      gender,
      address,
      dob,
      email,
      specialization,
      experience,
    });

    const doctorResponse = await newDoctor.save();

    return NextResponse.json(
      {
        message: "Add doctor successfully",
        data: doctorResponse,
        success: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "Failed to add doctor" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  connect();

  try {
    const doctorResponse = await DoctorModel.find().select("-__v");

    return NextResponse.json(
      {
        message: doctorResponse.length
          ? "Get doctor successfully"
          : "No Result Found!",
        success: true,
        data: doctorResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "Failed to fetch doctor" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  connect();

  try {
    const { doctorId } = await request.json();
    const deletedDoctor = await DoctorModel.findByIdAndDelete({
      _id: doctorId,
    });

    if (!deletedDoctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Delete doctor record successfully", success: true, data: deletedDoctor },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "Failed to delete Doctor" },
      { status: 500 }
    );
  }
};

export const PATCH = async (request) => {
  connect();

  try {
    const { _id, ...rest } = await request.json();

    if (!_id) {
      return NextResponse.json(
        { error: "DoctorId is empty!" },
        { status: 500 }
      );
    }

    await DoctorModel.updateOne({ _id }, { ...rest });
    const doctorResponse = await DoctorModel.findOne({ _id }).select('-__v');

    return NextResponse.json(
      {
        message: "Update doctor successfully",
        success: true,
        data: doctorResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { message: "Failed to update doctor" },
      { status: 500 }
    );
  }
};