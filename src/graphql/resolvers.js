import { HVAC } from "../models/HVAC";
require("dotenv").config();

export const resolvers = {
  Query: {
    HVAC: async () => await HVAC.find({}),
    HeaterTriggeredDates: async () => {
      let result = await HVAC.aggregate([
        { $match: { hasTriggeredAC: true } },
        {
          $group: {
            _id: "$Date",
            Date: { $first: "$Date" },
            Time: { $first: "$Time" },
            Name: { $first: "$Name" },
            Temperature: { $first: "$Temperature" },
            hasTriggeredAC: { $first: "$hasTriggeredAC" },
            hasTriggeredHeater: { $first: "$hasTriggeredHeater" },
          },
        },
        { $sort: { _id: -1 } },
      ]);
      return result;
    },
    ACTriggeredDates: async () => {
      let result = await HVAC.aggregate([
        { $match: { hasTriggeredAC: true } },
        {
          $group: {
            _id: "$Date",
            Date: { $first: "$Date" },
            Time: { $first: "$Time" },
            Name: { $first: "$Name" },
            Temperature: { $first: "$Temperature" },
            hasTriggeredAC: { $first: "$hasTriggeredAC" },
            hasTriggeredHeater: { $first: "$hasTriggeredHeater" },
          },
        },
        { $sort: { _id: -1 } },
      ]);
      return result;
    },
  },
};
