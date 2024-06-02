import { connect } from '@/database/dbConfig/dbConfig';
import CityModel from '@/database/models/cityModel';
import { NextResponse } from "next/server";

export const POST = async (request) => {
  connect();

  try {
    const { name } = await request.json();

    const city = await CityModel.findOne({ name });

    if (city) {
      return NextResponse.json(
        { error: "City already exists" },
        { status: 500 }
      )
    }

    if (!name) {
      return NextResponse.json(
        { error: "Please filled the details" },
        { status: 500 }
      );
    }

    const newCity = new CityModel({ name });
    const cityResponse = await newCity.save();

    return NextResponse.json(
      { message: "Add city successfully", success: true, data: cityResponse },
      { status: 200 }
    );

  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return NextResponse.json(
      { message: "Failed to add city" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  connect();

  try {
    const cityResponse = await CityModel.find();

    if (!cityResponse) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Get city successfully", success: true, data: cityResponse },
      { status: 200 },
    );

  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return NextResponse.json(
      { message: "Failed to add city" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request) => {
  connect();

  try {
    const city = await request.json();
    const deletedCity = await CityModel.findByIdAndDelete({ _id: city?.cityId });

    if (!deletedCity) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 500 }
      );
    }


    return NextResponse.json(
      { message: "Delete city successfully", success: true, data: deletedCity },
      { status: 200 },
    );

  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return NextResponse.json(
      { message: "Failed to add city", },
      { status: 500 }
    );
  }
};

export const PATCH = async (request) => {
  connect();

  try {
    const { _id, name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Please filled the details" },
        { status: 500 }
      );
    }

    await CityModel.updateOne({ _id }, { name });

    const cityResponse = await CityModel.findOne({ _id });

    return NextResponse.json(
      { message: "Update city successfully", success: true, data: cityResponse },
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return NextResponse.json(
      { message: "Failed to add city" },
      { status: 500 }
    );
  }
};