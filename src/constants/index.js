require("dotenv").config();

const CONSTANTS = {
  mongoUri: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_DATABASE_HOST}:${process.env.MONGO_DATABASE_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`,
  lowestTemperatureThreshold: 62,
  highestTemperatureThreshold: 72,
};

module.exports = { CONSTANTS };
