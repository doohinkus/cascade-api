import mongoose from "mongoose";
require("dotenv").config();
import { CONSTANTS } from "../constants";

export default async function connectMongoDB() {
  let connectionResult = "";
  try {
    await mongoose
      .connect(CONSTANTS.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        connectionResult = `Connected to mongo db (${process.env.MONGO_INITDB_DATABASE}) on ${process.env.MONGO_DATABASE_HOST}:${process.env.MONGO_DATABASE_PORT}`;
      })
      .catch((err) => {
        console.log(
          `
          Failed to connect to mongo.
          Is mongo running? 
          docker ps  

          If no containers are running:
          docker-compose -f "./docker-compose.yml" up -d --build
          `,
          err
        );
        throw new Error("Error connecting to mongo.");
        // process.exit();
      });
  } catch (err) {
    // console.log("Failed to connect to mongo...", err);
    connectionResult = "Failed to connect to mongo...";
    throw new Error("Failed mongo connection", err);
  }

  console.log(connectionResult);
}
