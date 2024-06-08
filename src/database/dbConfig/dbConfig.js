import mongoose from "mongoose";

export const connect = async () => {
  const connection = {};

  if (connection?.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    mongoose.connect(process.env.MONGO_URI).then((db) => {
      connection.isConnected = db.connections[0].readyState;
    });
  } catch (error) {
    console.log('Something went wrong in connecting to DB');
    console.log(error);
  }
}