import { CONSTANTS } from "../constants";
require("dotenv").config();
import connectMongoDB from "../mongo";
import { HVAC } from "../models/HVAC";
import csv from "csv-parser";
import fs from "fs";

async function addCsvToMongo() {
  connectMongoDB();

  const result = [];
  await fs
    .createReadStream("src/csvToGraphQl/history_data_hourly.csv")
    .pipe(csv())
    .on("data", (row) => {
      let entry = {
        Date: row["Date time"].split(" ")[0],
        Time: row["Date time"].split(" ")[1],
        Name: row["Name"],
        Temperature: parseFloat(row["Temperature"]),
        hasTriggeredAC:
          row["Temperature"] >= CONSTANTS.highestTemperatureThreshold,
        hasTriggeredHeater:
          row["Temperature"] <= CONSTANTS.lowestTemperatureThreshold,
      };
      result.push(entry);
    })
    .on("error", (err) => {
      console.log("Error ", err);
      throw new Error(
        "Error connecting to mongo. Is mongo running? docker ps",
        err
      );
    })
    .on("end", async () => {
      // add to mongo
      try {
        await addEntriesToMongo(result);
        console.log(
          `Entries added to mongo db (${process.env.MONGO_INITDB_DATABASE}) on ${process.env.MONGO_DATABASE_HOST}:${process.env.MONGO_DATABASE_PORT}
          Please start Apollo Server
          npm start
          Visit -> http://localhost:${process.env.PORT}
          `
        );
      } catch (err) {
        console.log("Error adding entries.");
        throw new Error("Failed to add entries", err);
      }
      // process.exit();
    });
}

function addEntriesToMongo(array) {
  // todo make this promise
  // ensure that all entries got added
  array.forEach(
    ({ Date, Time, Name, Temperature, hasTriggeredAC, hasTriggeredHeater }) => {
      const entry = new HVAC({
        Date,
        Time,
        Name,
        Temperature,
        hasTriggeredAC,
        hasTriggeredHeater,
      });
      entry
        .save()
        .catch((err) =>
          console.log("Failed to create customer -> ", entry, " ERROR ", err)
        );
    }
  );
}

addCsvToMongo();
